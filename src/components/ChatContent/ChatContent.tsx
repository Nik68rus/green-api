import { useCallback, useContext, useState } from "react";

import AuthContext from "../../context/AuthContext";
import ChatsContext from "../../context/ChatsContext";
import MessagesContext from "../../context/MessagesContext";
import { sendMessage } from "../../services/greenapi";
import { handleError } from "../../helpers/error";
import { BsSend } from "react-icons/bs";
import { Heading } from "../Heading/Heading";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";
import { Meassage } from "../Message/Meassage";
import { InfoMessage } from "../InfoMessage/InfoMessage";

import styles from "./ChatContent.module.scss";

export const ChatContent: React.FC = () => {
  const { getChatMessages, addMessage } = useContext(MessagesContext);
  const { activeChat } = useContext(ChatsContext);
  const { authData } = useContext(AuthContext);
  const [text, setText] = useState("");
  const messages = getChatMessages(activeChat as string);

  const idInstance = authData?.idInstance || "";
  const apiTokenInstance = authData?.apiTokenInstance || "";

  const sendHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
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
          time: new Date().toLocaleTimeString("ru-Ru", { timeStyle: "short" }),
        });
        setText("");
      } catch (error) {
        handleError(error);
      }
    },
    [activeChat, addMessage, apiTokenInstance, idInstance, text]
  );

  if (idInstance === "" || apiTokenInstance === "") {
    return (
      <InfoMessage>
        Для продолжения работы необходимо авторизоваться!
      </InfoMessage>
    );
  }

  return (
    <div className={styles.root}>
      <Heading level={3} className={styles.title}>
        Переписка c +{activeChat}
      </Heading>
      <div className={styles.history}>
        <div className={styles.messages}>
          {messages.map((msg) => (
            <Meassage key={msg.id} item={msg} />
          ))}
        </div>
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
