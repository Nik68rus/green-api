import Card from "../Card/Card";
import ChatContent from "../ChatContent/ChatContent";
import ChatList from "../ChatList/ChatList";
import styles from "./Messanger.module.scss";

const Messanger = () => {
  return (
    <Card tag="section" className={styles.root}>
      <ChatList />
      <ChatContent />
    </Card>
  );
};

export default Messanger;
