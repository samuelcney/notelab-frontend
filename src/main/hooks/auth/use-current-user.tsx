import { useAuth } from "@/main/context/auth";

export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};
