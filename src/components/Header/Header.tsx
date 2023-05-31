import { useCallback, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import { Container } from "../Container/Container";
import { Button } from "../Button/Button";
import logo from "../../assets/logo.png";

import styles from "./Header.module.scss";
import { DEFAULT_API_ERROR, logout } from "../../services/greenapi";
import { handleError } from "../../helpers/error";
import ChatsContext from "../../context/ChatsContext";
import MessagesContext from "../../context/MessagesContext";

export const Header = () => {
  const { authData, logOut, setAuthorizationStatus } = useContext(AuthContext);
  const { setContacts, setActiveChat } = useContext(ChatsContext);
  const { setMessages } = useContext(MessagesContext);

  const logOutHandler = useCallback(async () => {
    if (authData) {
      try {
        const { isLogout } = await logout(
          authData.idInstance,
          authData.apiTokenInstance
        );

        if (!isLogout) throw new Error(DEFAULT_API_ERROR);

        logOut();
        setAuthorizationStatus(false);
        localStorage.removeItem("contacts");
        setContacts([]);
        setActiveChat(null);
        setMessages([]);
      } catch (error) {
        handleError(error);
      }
    }
  }, [
    authData,
    logOut,
    setAuthorizationStatus,
    setContacts,
    setMessages,
    setActiveChat,
  ]);

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} width={48} height={48} alt="Green API лого" />
          <span>GREEN-API</span>
        </div>
        {authData && <Button onClick={logOutHandler}>Выйти</Button>}
      </Container>
    </header>
  );
};
