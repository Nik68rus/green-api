import React, { useContext, useState } from "react";
import ChatsContext from "../../../context/ChatsContext";
import { ButtonGroup } from "../../ButtonGroup/ButtonGroup";
import { Button } from "../../Button/Button";
import { Modal } from "../../Modal/Modal";
import { E164Number } from "libphonenumber-js/core";
import { TelInput } from "../../TextInput/TelInput";

interface ModalProps {
  onClose: () => void;
}

export const AddContactModal: React.FC<ModalProps> = ({ onClose }) => {
  const { addContact } = useContext(ChatsContext);
  const [value, setValue] = useState<E164Number | undefined>();

  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (value) {
      addContact(value.toString().replace("+", ""));
      onClose();
    }
  };

  return (
    <Modal heading="Создать чат" onClose={onClose}>
      <form onSubmit={formSubmitHandler}>
        <TelInput
          id="tel"
          placeholder="Введите номер телефона"
          value={value}
          onChange={setValue}
          autoFocus={true}
        />
        <ButtonGroup>
          <Button type="submit" disabled={!value}>
            OK
          </Button>
          <Button onClick={onClose} variant="outlined">
            Отмена
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  );
};
