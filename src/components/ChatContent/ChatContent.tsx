import { useCallback, useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import ChatsContext from "../../context/ChatsContext";
import MessagesContext from "../../context/MessagesContext";
import { BsSend } from "react-icons/bs";
import { Heading } from "../Heading/Heading";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";
import { Meassage } from "../Message/Meassage";
import { InfoMessage } from "../InfoMessage/InfoMessage";

import styles from "./ChatContent.module.scss";
import {
  deleteNotification,
  recieveNotification,
  sendMessage,
} from "../../services/greenapi";
import { handleError } from "../../helpers/error";

export const ChatContent: React.FC = () => {
  const { getChatMessages, addMessage } = useContext(MessagesContext);
  const { activeChat } = useContext(ChatsContext);
  const { authData } = useContext(AuthContext);
  const [text, setText] = useState("");
  const messages = getChatMessages(activeChat as string);

  const idInstance = authData?.idInstance || "";
  const apiTokenInstance = authData?.apiTokenInstance || "";

  const sendHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!activeChat || text.length === 0) return;

    try {
      const data = await sendMessage(
        idInstance,
        apiTokenInstance,
        activeChat,
        text
      );
      addMessage({
        type: "outgoing",
        chat: activeChat,
        text,
        id: data.idMessage,
      });
      setText("");
    } catch (error) {
      handleError(error);
    }
  };

  const deleteNotificationHandler = useCallback(
    async (receiptId: string) => {
      try {
        await deleteNotification(idInstance, apiTokenInstance, receiptId);
      } catch (error) {
        handleError(error);
      }
    },
    [apiTokenInstance, idInstance]
  );

  const recieveNotificationHandler = useCallback(async () => {
    console.log("polling");
    try {
      const data = await recieveNotification(idInstance, apiTokenInstance);
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
    } catch (error) {
      handleError(error);
    }
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
