import Container from "../Container/Container";
import logo from "../../assets/logo.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.logo}>
        <img src={logo} width={48} height={48} alt="Green API лого" />
        <span>GREEN-API</span>
      </Container>
    </header>
  );
};

export default Header;
