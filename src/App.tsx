import { useCallback, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AuthContext from "./context/AuthContext";
import { AuthForm } from "./components/AuthForm/AuthForm";
import { Container } from "./components/Container/Container";
import { Header } from "./components/Header/Header";
import { Messanger } from "./components/Messanger/Messanger";

import styles from "./App.module.scss";
import {
  actualizeSettings,
  deleteNotification,
  recieveNotification,
} from "./services/greenapi";
import { handleError } from "./helpers/error";
import MessagesContext from "./context/MessagesContext";

function App() {
  const { authData, authorized, setAuthorizationStatus } =
    useContext(AuthContext);
  const { addMessage } = useContext(MessagesContext);

  const idInstance = authData?.idInstance || "";
  const apiTokenInstance = authData?.apiTokenInstance || "";

  const deleteNotificationHandler = useCallback(
    async (receiptId: string) => {
      try {
        const data = await deleteNotification(
          idInstance,
          apiTokenInstance,
          receiptId
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
    [apiTokenInstance, idInstance]
  );

  const recieveNotificationHandler = useCallback(async () => {
    let deleted = false;
    try {
      const data = await recieveNotification(idInstance, apiTokenInstance);

      if (data?.receiptId) {
        const { result } = await deleteNotificationHandler(data.receiptId);
        deleted = result;
      }

      if (
        deleted &&
        data?.body?.typeWebhook === "incomingMessageReceived" &&
        data?.body?.messageData?.textMessageData?.textMessage
      ) {
        addMessage({
          type: "incoming",
          chat: data.body.senderData.chatId.split("@")[0],
          text: data.body.messageData.textMessageData.textMessage,
          id: data.body.idMessage,
          time: new Date().toLocaleTimeString("ru-Ru", {
            timeStyle: "short",
          }),
        });
      } else if (
        deleted &&
        data?.body?.typeWebhook === "stateInstanceChanged" &&
        data?.body?.stateInstance === "authorized"
      ) {
        setAuthorizationStatus(true);
        await actualizeSettings(idInstance, apiTokenInstance);
      }
    } catch (error) {
      handleError(error);
    }
  }, [
    idInstance,
    apiTokenInstance,
    deleteNotificationHandler,
    addMessage,
    setAuthorizationStatus,
  ]);

  useEffect(() => {
    if (idInstance === "" || apiTokenInstance === "") return;
    const intervalId = setInterval(recieveNotificationHandler, 2000);
    return () => clearInterval(intervalId);
  }, [recieveNotificationHandler, idInstance, apiTokenInstance]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Container htmlTag="section" className={styles.root}>
          {authData && authorized ? <Messanger /> : <AuthForm />}
        </Container>
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
