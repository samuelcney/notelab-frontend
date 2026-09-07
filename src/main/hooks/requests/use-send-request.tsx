import { sendRequestService } from "@/main/services/send-request/sendRequestService";
import { notify } from "@/presentation/components/toast/Toast";
import { pathNameEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSendInstructorRequest = () => {
  const { push } = useRouter();

  return useMutation({
    mutationFn: sendRequestService.sendRequest,
    onSuccess: () => {
      notify("Solicitação enviada com sucesso!", "success");

      push(pathNameEnum.HOME);
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
