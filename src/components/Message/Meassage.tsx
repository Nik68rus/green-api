import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { IMessage } from "../../types";

import styles from "./Message.module.scss";

interface MessageProps {
  item: IMessage;
}

export const Meassage: React.FC<MessageProps> = React.memo(({ item }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const { type, text, time } = item;

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={messageRef}
      className={classNames(
        styles.root,
        type === "outgoing" ? styles.outgoing : styles.incoming
      )}
    >
      {text}
      <div className={styles.time}>{time}</div>
    </div>
  );
});
