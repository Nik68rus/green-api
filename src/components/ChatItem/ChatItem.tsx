import { useContext } from "react";
import classNames from "classnames";
import ChatsContext from "../../context/ChatsContext";

import styles from "./ChatItem.module.scss";

interface ChatItemProps {
  tel: string;
}

export const ChatItem = ({ tel }: ChatItemProps) => {
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
