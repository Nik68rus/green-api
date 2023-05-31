import { useContext, useEffect, useRef } from "react";
import classNames from "classnames";
import ChatsContext from "../../context/ChatsContext";

import styles from "./ChatItem.module.scss";

interface ChatItemProps {
  tel: string;
}

export const ChatItem = ({ tel }: ChatItemProps) => {
  const { setActiveChat, activeChat } = useContext(ChatsContext);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
      chatRef.current?.click();
    }
  }, []);

  return (
    <div
      ref={chatRef}
      className={classNames(styles.root, activeChat === tel && styles.active)}
      onClick={setActiveChat.bind(null, tel)}
    >
      +{tel}
    </div>
  );
};
