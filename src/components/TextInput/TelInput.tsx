import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

import styles from "./TextInput.module.scss";
import classNames from "classnames";

interface TelInputProps {
  label?: string;
  placeholder?: string;
  id: string;
  value: E164Number | undefined;
  onChange: React.Dispatch<React.SetStateAction<E164Number | undefined>>;
  className?: string;
  autoFocus?: boolean;
}

export const TelInput = ({
  value,
  label,
  placeholder,
  id,
  onChange,
  className,
  autoFocus,
}: TelInputProps) => {
  return (
    <div className={classNames(styles.root, className)}>
      {label && <label htmlFor={id}>{label}</label>}

      <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        smartCaret={false}
        autoFocus={autoFocus}
      />
    </div>
  );
};
