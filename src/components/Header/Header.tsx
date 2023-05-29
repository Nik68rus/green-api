import Container from "../Container/Container";
import logo from "../../assets/logo.png";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { authData, logOut } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} width={48} height={48} alt="Green API лого" />
          <span>GREEN-API</span>
        </div>
        {authData && <Button onClick={logOut}>Выйти</Button>}
      </Container>
    </header>
  );
};

export default Header;
