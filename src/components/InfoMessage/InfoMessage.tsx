import React from "react";

import styles from "./InfoMessage.module.scss";

export const InfoMessage: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className={styles.root}>{children}</div>;
};
