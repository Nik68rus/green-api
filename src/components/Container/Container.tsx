import { createElement } from "react";
import classNames from "classnames";

import styles from "./Container.module.scss";

interface ContainerProps {
  htmlTag?: "div" | "section" | "article";
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  className = "",
  htmlTag = "div",
  children,
}) => {
  return createElement(
    htmlTag ?? "div",
    {
      className: classNames(styles.container, className),
    },
    children
  );
};
