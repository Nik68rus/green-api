import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import AuthContext from "../../context/AuthContext";
import ChatsContext from "../../context/ChatsContext";
import MessagesContext from "../../context/MessagesContext";
import { BsSend } from "react-icons/bs";
import { Heading } from "../Heading/Heading";
import { TextInput } from "../TextInput/TextInput";
import Button from "../Button/Button";
import Meassage from "../Message/Meassage";

import styles from "./ChatContent.module.scss";
import InfoMessage from "../InfoMessage/InfoMessage";

const ChatContent: React.FC = () => {
  const { getChatMessages, addMessage } = useContext(MessagesContext);
  const { activeChat } = useContext(ChatsContext);
  const { authData } = useContext(AuthContext);
  const [text, setText] = useState("");
  const messages = getChatMessages(activeChat as string);

  const idInstance = authData?.idInstance || "";
  const apiTokenInstance = authData?.apiTokenInstance || "";

  const sendHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const body = {
      chatId: activeChat + "@c.us",
      message: text,
    };

    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.ok) {
      addMessage({
        type: "outgoing",
        chat: activeChat as string,
        text,
        id: data.idMessage,
      });
      setText("");
    } else {
      toast.error("Что-то пошло не так! Повторите отправку!");
    }
  };

  const deleteNotificationHandler = useCallback(
    async (receiptId: string) => {
      console.log("deleting");
      const response = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        toast.error("Что-то пошло не так!");
      }
    },
    [apiTokenInstance, idInstance]
  );

  const recieveNotificationHandler = useCallback(async () => {
    console.log("polling");

    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    );
    const data = await response.json();
    console.log(data);
    if (data?.receiptId) await deleteNotificationHandler(data.receiptId);

    if (
      data?.body?.typeWebhook === "incomingMessageReceived" &&
      data?.body?.messageData?.textMessageData?.textMessage
    ) {
      addMessage({
        type: "incoming",
        chat: data.body.senderData.chatId.split("@")[0],
        text: data.body.messageData.textMessageData.textMessage,
        id: data.body.idMessage,
      });
    }
    if (!response.ok) return toast.error("Что-то пошло не так");
  }, [idInstance, apiTokenInstance, deleteNotificationHandler, addMessage]);

  useEffect(() => {
    const intervalId = setInterval(recieveNotificationHandler, 3000);
    return () => clearInterval(intervalId);
  }, [recieveNotificationHandler]);

  if (idInstance === "" || apiTokenInstance === "") {
    return (
      <InfoMessage>
        Для продолжения работы необходимо авторизоваться!
      </InfoMessage>
    );
  }

  return (
    <div className={styles.root}>
      <Heading level={3}>Переписка c {activeChat}</Heading>
      <div className={styles.history}>
        {messages.map((msg) => (
          <Meassage key={msg.id} item={msg} />
        ))}
      </div>
      <form onSubmit={sendHandler} className={styles.form}>
        <TextInput
          type="text"
          id="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          noError
        />
        <Button type="submit">
          <BsSend />
        </Button>
      </form>
    </div>
  );
};

export default ChatContent;
