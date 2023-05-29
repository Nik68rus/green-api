import { ToastContainer } from "react-toastify";
import styles from "./App.module.scss";
import AuthForm from "./components/AuthForm/AuthForm";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Messanger from "./components/Messanger/Messanger";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { authData } = useContext(AuthContext);
  return (
    <div className="wrapper">
      <Header />
      <Container htmlTag="section" className={styles.root}>
        {authData ? <Messanger /> : <AuthForm />}
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
