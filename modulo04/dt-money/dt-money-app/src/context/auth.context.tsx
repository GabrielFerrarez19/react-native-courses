import { FormLoginParams } from "@/screens/Login/components/LoginForm";
import { FormRegisterParams } from "@/screens/Register/components/RegisterForm";
import { IUser } from "@/shared/interfaces/user-interface";
import * as authService from "@/shared/services/dt-money/auth.service";
import {
  createContext,
  FC,
  PropsWithChildren,
  use,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: FormRegisterParams) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { token, user } = await authService.authenticate(userData);
    console.log(token, use);
    setUser(user);
    setToken(token);
  };

  const handleRegister = async (formData: FormRegisterParams) => {};

  const handleLogout = () => {};

  return (
    <AuthContext.Provider
      value={{
        handleAuthenticate,
        handleLogout,
        handleRegister,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
