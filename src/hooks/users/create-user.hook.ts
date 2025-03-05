import { useState } from "react";

import { userService } from "@/services/users/userService";
import { notify } from "@/components/Toast/Toast";
import { useRequestState } from "../useRequestState";

export const useRegister = () => {
  const { loading, setLoading } = useRequestState();

  const handleRegister = async (data: CreateUserDTO, onToggle: () => void) => {
    setLoading(true);
    try {
      const userData = await userService.createUser(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      notify("Cadastro realizado com sucesso", "success");
      onToggle();
      console.log(userData);
    } catch (error: any) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
  };
};
