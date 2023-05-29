import React from "react";
import styles from "./Card.module.scss";
import classNames from "classnames";

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
      className: classNames(className, styles.card),
    },
    children
  );

export default Card;
