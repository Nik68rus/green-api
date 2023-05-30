import React from "react";
import classNames from "classnames";

import styles from "./Heading.module.scss";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

export const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  level,
  children,
  className,
}) =>
  React.createElement(
    `h${level ? level : 2}`,
    {
      className: classNames(
        styles.heading,
        styles[`heading--h${level}`],
        className
      ),
    },
    children
  );
