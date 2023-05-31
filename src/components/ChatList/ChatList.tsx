import { useCallback, useContext, useEffect, useState } from "react";

import ChatsContext from "../../context/ChatsContext";
import { Button } from "../Button/Button";
import { AddContactModal } from "../modals/AddContactModal/AddContactModal";
import { ChatItem } from "../ChatItem/ChatItem";
import { InfoMessage } from "../InfoMessage/InfoMessage";
import { FaPlus } from "react-icons/fa";

import styles from "./ChatList.module.scss";

export const ChatList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { contacts, setContacts } = useContext(ChatsContext);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    if (storedContacts.length) {
      setContacts(storedContacts);
    }
  }, [setContacts]);

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const modalCloseHandler = useCallback(() => {
    setModalVisible(false);
  }, []);

  const modalOpenHandler = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.list}>
          {contacts.length ? (
            contacts.map((number) => <ChatItem key={number} tel={number} />)
          ) : (
            <InfoMessage>Добавьте контакты для начала общения</InfoMessage>
          )}
        </div>
        <Button onClick={modalOpenHandler} className={styles.addBtn}>
          <FaPlus />
          <span>Создать чат</span>
        </Button>
      </div>
      {modalVisible && <AddContactModal onClose={modalCloseHandler} />}
    </>
  );
};
