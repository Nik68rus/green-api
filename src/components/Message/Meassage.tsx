import React from "react";
import classNames from "classnames";
import { IMessage } from "../../types";

import styles from "./Message.module.scss";

interface MessageProps {
  item: IMessage;
}

export const Meassage: React.FC<MessageProps> = ({ item }) => {
  const { type, text } = item;

  return (
    <div
      className={classNames(
        styles.root,
        type === "outgoing" ? styles.outgoing : styles.incoming
      )}
    >
      {text}
    </div>
  );
};
