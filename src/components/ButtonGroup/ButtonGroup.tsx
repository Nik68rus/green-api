import React from "react";
import styles from "./ButtonGroup.module.scss";
import classNames from "classnames";

interface ButtonGroupProps {
  className?: string;
}

export const ButtonGroup: React.FC<
  React.PropsWithChildren<ButtonGroupProps>
> = ({ children, className }) => {
  return <div className={classNames(styles.root, className)}>{children}</div>;
};
