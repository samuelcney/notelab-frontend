export const getErrorMessage = (error: any): string => {
  if (error?.isAxiosError) {
    if (error?.code === "ERR_NETWORK") {
      return "Erro com o servidor. Verifique sua conexão com a internet.";
    }

    if (error?.response?.data?.message) {
      return error.response.data.message;
    }

    if (error?.response?.data?.errors) {
      return `Erros: ${error.response.data.errors
        .map((err: any) => err.message)
        .join(", ")}`;
    }

    if (error?.response?.data?.error) {
      return error.response.data.error;
    }
  }

  if (error?.message) {
    return error.message;
  }

  return "Ocorreu um erro desconhecido.";
};
