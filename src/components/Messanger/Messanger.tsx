import { useContext } from "react";
import ChatsContext from "../../context/ChatsContext";
import { Card } from "../Card/Card";
import { ChatContent } from "../ChatContent/ChatContent";
import { ChatList } from "../ChatList/ChatList";
import { InfoMessage } from "../InfoMessage/InfoMessage";

import styles from "./Messanger.module.scss";

export const Messanger: React.FC = () => {
  const { activeChat } = useContext(ChatsContext);
  return (
    <Card tag="section" className={styles.root}>
      <ChatList />
      {activeChat ? (
        <ChatContent />
      ) : (
        <InfoMessage>Выберите контакт!</InfoMessage>
      )}
    </Card>
  );
};
