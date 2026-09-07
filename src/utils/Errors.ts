type AxiosErrorShape = {
  isAxiosError?: boolean;
  code?: string;
  message?: string;
  response?: {
    data?: {
      message?: string;
      error?: string;
      errors?: Array<{ message?: string }>;
    };
  };
};

export const getErrorMessage = (error: unknown): string => {
  const err = (error ?? {}) as AxiosErrorShape;

  if (err.isAxiosError) {
    if (err.code === "ERR_NETWORK") {
      return "Erro com o servidor. Verifique sua conexão com a internet.";
    }

    if (err.response?.data?.message) {
      return err.response.data.message;
    }

    if (err.response?.data?.errors) {
      return `Erros: ${err.response.data.errors
        .map((e) => e.message)
        .join(", ")}`;
    }

    if (err.response?.data?.error) {
      return err.response.data.error;
    }
  }

  if (err.message) {
    return err.message;
  }

  return "Ocorreu um erro desconhecido.";
};
