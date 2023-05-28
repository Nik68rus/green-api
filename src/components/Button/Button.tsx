import React, {
  MouseEvent,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import styles from "./Button.module.scss";
import cx from "classnames";

interface ButtonProps {
  readonly variant?: "outlined" | "primary";
  readonly type?: "button" | "submit" | "reset";
  readonly disabled?: boolean;
  readonly onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  readonly className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  className,
  children,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.addEventListener("click", () => {
        btnRef.current?.blur();
      });
    }
  }, []);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(styles.root, className, styles[variant])}
      ref={btnRef}
    >
      {children}
    </button>
  );
};

export default Button;
