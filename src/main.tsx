import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ChatsContextProvider } from "./context/ChatsContext.tsx";
import { MessagesContextProvider } from "./context/MessagesContext.tsx";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatsContextProvider>
        <MessagesContextProvider>
          <App />
        </MessagesContextProvider>
      </ChatsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
