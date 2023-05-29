import { useContext } from "react";
import styles from "./ChatItem.module.scss";
import ChatsContext from "../../context/ChatsContext";
import classNames from "classnames";

interface ChatItemProps {
  tel: string;
}

const ChatItem = ({ tel }: ChatItemProps) => {
  const { setActiveChat, activeChat } = useContext(ChatsContext);

  return (
    <div
      className={classNames(styles.root, activeChat === tel && styles.active)}
      onClick={setActiveChat.bind(null, tel)}
    >
      {tel}
    </div>
  );
};

export default ChatItem;
