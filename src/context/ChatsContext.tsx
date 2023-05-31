import { createContext, useCallback, useState } from "react";

interface IChatsContext {
  contacts: string[];
  activeChat: string | null;
  setContacts: (contacts: string[]) => void;
  addContact: (tel: string) => void;
  setActiveChat: (tel: string | null) => void;
}

const initialState: IChatsContext = {
  contacts: [],
  activeChat: null,
  setContacts: () => {
    /*setContactsHandler*/
  },
  addContact: () => {
    /* contactAddHandler */
  },
  setActiveChat: () => {
    /* activeChatSetter */
  },
};

const ChatsContext = createContext<IChatsContext>(initialState);

export const ChatsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const activeChatSetter = useCallback((tel: string | null) => {
    setActiveChat(tel);
  }, []);

  const addContact = (tel: string) => {
    const inList = contacts.some((contact) => contact === tel);
    if (!inList) {
      setContacts((prev) => [...prev, tel]);
    }
  };

  return (
    <ChatsContext.Provider
      value={{
        contacts,
        setContacts,
        activeChat,
        setActiveChat: activeChatSetter,
        addContact,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContext;
