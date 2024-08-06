import { AxiosError, isAxiosError } from "axios";
import { GenericObjectInterface } from "../commonInterface";
import { ApiStatusCodes } from "../api/apiStatusCodes";
import { showErrorMessage, showWarningMessage } from "../PopupUserExperience/PopupUserExperience";

export function handleGlobalErrorNetwork(error: any) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<GenericObjectInterface>;
      if (axiosError.response?.status == ApiStatusCodes.SERVER_ERROR) {
        showErrorMessage("Please try again!");
      } else {
        const errorBody = axiosError.response?.data
        ? axiosError.response.data
        : {};
        console.log(errorBody)
        if (errorBody.error) {
          if(typeof errorBody.error == 'string')
            showWarningMessage(errorBody.error);
          else if(Array.isArray(errorBody.error)){
            showWarningMessage(errorBody.error.join(', '));
          } else {
            Object.keys(errorBody.error).forEach((key) => {
              const errorMessages: string[] = errorBody.error[key];
              const field: string =
                key == "cincopy" ? "CIN" : key == "pancopy" ? "PAN" : key;
              showWarningMessage(`${field}: ${errorMessages.join(" ")}`);
            });
          }
        } else {
          if(typeof errorBody == 'string')
            showWarningMessage(errorBody);
          else if(Array.isArray(errorBody)){
            showWarningMessage(errorBody.join(', '));
          } else {
            console.log(Object.keys(errorBody))
            Object.keys(errorBody).forEach((key) => {
              const errorMessages: string[] = errorBody[key];
              const field: string =
                key == "cincopy" ? "CIN" : key == "pancopy" ? "PAN" : key;
              showWarningMessage(`${field}: ${errorMessages.join(" ")}`);
            });
          }
        }
      }
    }
  }