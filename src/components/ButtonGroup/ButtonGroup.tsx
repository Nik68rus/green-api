import React from "react";
import classNames from "classnames";

import styles from "./ButtonGroup.module.scss";

interface ButtonGroupProps {
  className?: string;
}

export const ButtonGroup: React.FC<
  React.PropsWithChildren<ButtonGroupProps>
> = ({ children, className }) => {
  return <div className={classNames(styles.root, className)}>{children}</div>;
};
