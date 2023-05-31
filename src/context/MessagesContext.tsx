import { createContext, useCallback, useState } from "react";
import { IMessage } from "../types";

interface IMessagesContext {
  messages: IMessage[];
  setMessages: (msgs: IMessage[]) => void;
  addMessage: (message: IMessage) => void;
  getChatMessages: (tel: string) => IMessage[];
}

const initialState: IMessagesContext = {
  messages: [],
  setMessages: () => {
    /* setMessagesHandler */
  },
  addMessage: () => {
    /* addMessageHandler */
  },
  getChatMessages: () => [],
};

const MessagesContext = createContext<IMessagesContext>(initialState);

export const MessagesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const addMessage = useCallback((msg: IMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const getChatMessages = useCallback(
    (tel: string) => {
      return messages.filter((msg) => msg.chat === tel);
    },
    [messages]
  );

  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, addMessage, getChatMessages }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
