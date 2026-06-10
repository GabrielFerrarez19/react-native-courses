import { useSnacbarContext } from "@/context/snackbar.context";
import { AppError } from "../helpers/AppError";

export const useErrorHandler = () => {
  const { notify } = useSnacbarContext();

  const handlerError = (error: unknown, defaultMessage?: string) => {
    const isAppError = error instanceof AppError;

    const message = isAppError
      ? error.message
      : (defaultMessage ?? "Falha na requisção");

    notify({
      message,
      messageType: "ERROR",
    });
  };

  return {
    handlerError,
  };
};
