import { useCallback, useContext } from "react";

import AuthContext from "../../context/AuthContext";
import { Container } from "../Container/Container";
import { Button } from "../Button/Button";
import logo from "../../assets/logo.png";

import styles from "./Header.module.scss";
import { logout } from "../../services/greenapi";
import { handleError } from "../../helpers/error";

export const Header = () => {
  const { authData, logOut, setAuthorizationStatus } = useContext(AuthContext);

  const logOutHandler = useCallback(async () => {
    if (authData) {
      try {
        const { isLogout } = await logout(
          authData.idInstance,
          authData.apiTokenInstance
        );
        isLogout && logOut();
        isLogout && setAuthorizationStatus(false);
      } catch (error) {
        handleError(error);
      }
    }
  }, [authData, logOut, setAuthorizationStatus]);

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
