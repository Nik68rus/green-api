import { toast } from "react-toastify";
import { DEFAULT_API_ERROR } from "../services/greenapi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => {
  let message = DEFAULT_API_ERROR;
  if (error instanceof Error) {
    message = error.message;
  }
  toast.error(message);
};
