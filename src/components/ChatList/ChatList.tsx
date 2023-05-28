import styles from "./ChatList.module.scss";
import Button from "../Button/Button";
import { PlusIcon } from "../Icons/Icons";
import { TextInput } from "../TextInput/TextInput";

const ChatList = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <TextInput type="tel" id="phone" />
        <Button>
          <PlusIcon />
          Начать
        </Button>
      </div>
    </div>
  );
};

export default ChatList;
