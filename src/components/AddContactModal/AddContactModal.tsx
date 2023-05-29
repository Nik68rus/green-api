import React, { useContext, useState } from "react";
import { TextInput } from "../TextInput/TextInput";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import { Modal } from "../Modal/Modal";
import ChatsContext from "../../context/ChatsContext";

interface ModalProps {
  onClose: () => void;
}

const AddContactModal: React.FC<ModalProps> = ({ onClose }) => {
  const { addContact } = useContext(ChatsContext);
  const [number, setNumber] = useState("");

  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addContact(number);
    onClose();
  };

  return (
    <Modal heading="Создать чат" onClose={onClose}>
      <form onSubmit={formSubmitHandler}>
        <TextInput
          label="Введите номер телефона"
          placeholder="+7 ___ ___ __ __"
          type="tel"
          id="phone"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <ButtonGroup>
          <Button type="submit">OK</Button>
          <Button onClick={onClose} variant="outlined">
            Отмена
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  );
};

export default AddContactModal;
