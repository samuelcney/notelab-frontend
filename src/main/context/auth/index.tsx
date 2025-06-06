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
  user: UserType | null;
  token: string | null;
  login: (token: string, user: UserType) => void;
  refreshToken: (token: string) => void;
  logout: () => void;
  signed: boolean;
  updateUser: (user: Partial<UserType>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const { data: fetchedUser, isLoading } = useMe(token, !user && !!token);

  const login = (newToken: string, newUser: UserType) => {
    Cookies.set("token", newToken, { expires: 1 });
    Cookies.set("user", JSON.stringify(newUser), { expires: 1 });
    setToken(newToken);
    setUser(newUser);
  };

  const refreshToken = (newToken: string) => {
    Cookies.set("token", newToken, { expires: 1 });
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedFields: Partial<UserType>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields } as UserType;
      Cookies.set("user", JSON.stringify(updated), { expires: 1 });
      return updated;
    });
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken) setToken(storedToken);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (fetchedUser === null && !isLoading) {
      logout();
    } else if (fetchedUser && !user) {
      setUser(fetchedUser);
      Cookies.set("user", JSON.stringify(fetchedUser), { expires: 1 });
    }
  }, [fetchedUser, isLoading]);

  if (!user && isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        signed: !!user,
        updateUser,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
