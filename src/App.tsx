import styles from "./App.module.scss";
import AuthForm from "./components/AuthForm/AuthForm";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Messanger from "./components/Messanger/Messanger";

function App() {
  return (
    <>
      <Header />
      <Container htmlTag="section" className={styles.root}>
        <AuthForm />
        <Messanger />
      </Container>
    </>
  );
}

export default App;
