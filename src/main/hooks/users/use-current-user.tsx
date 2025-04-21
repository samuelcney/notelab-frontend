import { useAuth } from "@/main/context/auth";
import { SupabaseUserData } from "@/types/types";

export const useCurrentUser = (): SupabaseUserData | null => {
  const { user } = useAuth();
  return user;
};
