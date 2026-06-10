import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { string } from "yup";

export type SnackbarMessageType = "ERROR" | "SUCCESS";

interface NotifyMessageParams {
  message: string;
  messageType: SnackbarMessageType;
}

export type SnackBarContextType = {
  message: string | null;
  type: SnackbarMessageType | null;
  notify: (params: NotifyMessageParams) => void;
};

const SnackbarContext = createContext({} as SnackBarContextType);

export const SnackbarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackbarMessageType | null>(null);

  const notify = ({ message, messageType }: NotifyMessageParams) => {
    setMessage(message);
    setType(messageType);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  };

  return (
    <SnackbarContext.Provider
      value={{
        message,
        type,
        notify,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnacbarContext = () => {
  const context = useContext(SnackbarContext);
  return context;
};
