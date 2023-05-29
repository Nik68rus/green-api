import React from "react";
import styles from "./TextInput.module.scss";
import classNames from "classnames";

type TInputType = "email" | "password" | "text" | "number" | "tel";

interface Props {
  readonly label?: string;
  readonly type: TInputType;
  readonly id: string;
  readonly name?: string;
  readonly value?: string | number;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly placeholder?: string;
  readonly hint?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly noError?: boolean;
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
  noError,
}: Props) => {
  return (
    <div
      className={classNames(styles.root, className, noError && styles.noError)}
    >
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
