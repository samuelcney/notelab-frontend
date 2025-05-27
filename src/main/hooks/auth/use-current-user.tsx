import { useAuth } from "@/main/context/auth";
import { UserType } from "@/types/types";

export const useCurrentUser = (): UserType | null => {
  const { user } = useAuth();
  return user ?? null;
};
