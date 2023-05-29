import React from "react";
import styles from "./Message.module.scss";
import classNames from "classnames";
import { IMessage } from "../../types";

interface MessageProps {
  item: IMessage;
}

const Meassage: React.FC<MessageProps> = ({ item }) => {
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

export default Meassage;
