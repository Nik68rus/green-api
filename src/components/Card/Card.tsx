import React from "react";
import classNames from "classnames";

import styles from "./Card.module.scss";

interface CardProps {
  tag?: "div" | "article" | "section";
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  tag,
  className,
  children,
}) =>
  React.createElement(
    tag ?? "div",
    {
      className: classNames(className, styles.card),
    },
    children
  );
