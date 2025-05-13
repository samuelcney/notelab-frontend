"use client";

import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useMe } from "@/main/hooks";
import LoadingScreen from "@/presentation/components/loading-screen/LoadingScreen";
import { UserType } from "@/types/types";

interface AuthContextProps {
  user: UserType;
  token: string | null;
  login: (token: string, user: UserType) => void;
  logout: () => void;
  signed: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const { data: fetchedUser, isLoading } = useMe(token, !user);

  const login = (newToken: string, newUser: UserType) => {
    Cookies.set("token", newToken, { expires: 1 });
    Cookies.set("user", JSON.stringify(newUser), { expires: 1 });
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (fetchedUser && !user) {
      setUser(fetchedUser);
      Cookies.set("user", JSON.stringify(fetchedUser), { expires: 1 });
    }
  }, [fetchedUser]);

  if (!user && isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user as UserType,
        token,
        login,
        logout,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
