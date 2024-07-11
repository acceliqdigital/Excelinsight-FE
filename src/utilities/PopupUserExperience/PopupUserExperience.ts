import { toast } from "react-toastify";

const showSuccessMessage = (message: string, duration: number = 3000) => {
  toast.success(message, {
    // position: "top-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: 16,
    },
  });
};

const showWarningMessage = (message: string, duration: number = 3000) => {
  toast.warn(message, {
    // position: "top-right",
    // autoClose: 5000,
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: 16,
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const showErrorMessage = (message: any, duration: number = 3000) => {
  let msg = "";
  if (typeof message === "string") {
    msg = message;
  } else {
    msg = message?.response?.data
      ? message?.response?.data
      : message?.response?.data?.message
      ? message?.response?.data?.message
      : "Something went wrong!";
  }
  if (msg.length > 100) {
    msg = "Something went wrong!";
  }
  toast.error(msg, {
    // position: "top-right",
    // autoClose: 5000,
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: 16,
    },
  });
};

const showPromise = <T>(
  promise: Promise<T>,
  pendingMessage: string,
  successMessage: string,
  errorMessage: string
): void => {
  toast.promise(promise, {
    pending: pendingMessage,
    success: successMessage,
    error: errorMessage
  })
}

export { showErrorMessage, showSuccessMessage, showWarningMessage, showPromise };