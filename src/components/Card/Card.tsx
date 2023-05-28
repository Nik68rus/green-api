import React from "react";
import styles from "./Card.module.scss";
import cx from "classnames";

interface CardProps {
  tag?: "div" | "article" | "section";
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  tag,
  className,
  children,
}) =>
  React.createElement(
    tag ?? "div",
    {
      className: cx(className, styles.card),
    },
    children
  );

export default Card;
