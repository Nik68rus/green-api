import React from "react";
import cx from "classnames";
import styles from "./TextInput.module.scss";

type TInputType = "email" | "password" | "text" | "number" | "tel";

interface Props {
  label?: string;
  type: TInputType;
  id: string;
  name?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export const TextInput = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  hint,
  disabled,
  className,
}: Props) => {
  return (
    <div className={cx(styles.root, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name ?? id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled}
      />
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
};
