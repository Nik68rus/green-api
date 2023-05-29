import { useCallback, useContext, useState } from "react";

import ChatsContext from "../../context/ChatsContext";
import Button from "../Button/Button";
import AddContactModal from "../AddContactModal/AddContactModal";
import ChatItem from "../ChatItem/ChatItem";
import InfoMessage from "../InfoMessage/InfoMessage";

import styles from "./ChatList.module.scss";
import { FaPlus } from "react-icons/fa";

const ChatList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { contacts } = useContext(ChatsContext);

  const modalCloseHandler = useCallback(() => {
    setModalVisible(false);
  }, []);

  const modalOpenHandler = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <div className={styles.root}>
        {contacts.length ? (
          contacts.map((number) => <ChatItem key={number} tel={number} />)
        ) : (
          <InfoMessage>Добавьте контакты для начала общения</InfoMessage>
        )}
        <Button onClick={modalOpenHandler} className={styles.addBtn}>
          <FaPlus />
          Создать чат
        </Button>
      </div>
      {modalVisible && <AddContactModal onClose={modalCloseHandler} />}
    </>
  );
};

export default ChatList;
