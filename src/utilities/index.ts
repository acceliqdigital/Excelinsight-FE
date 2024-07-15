import {
  CustomButtonProp,
  CustomFileUploadProp,
  CustomResponse,
  CustomTextAreaProp,
  CustomTextInputProp,
  GenericObjectInterface,
  HeaderProp,
  KeybordEventType,
  UploadFormikProps,
  inputChangeEventType,
  inputKeyDownEventType,
  textAreaChangeEventType,
  ArrayOfStringType,
  lottieAnimProviderProptypes,
  TypeWriterUIPropTypes
} from "./commonInterface/index";
import { constants } from "./constants/index";
import { colors } from "./themes/colors";
import {
  API_END_POINTS,
  BASE_URL,
  CONTENT_TYPES,
  fetchData,
  headersList,
  patchData,
  postData,
} from "./api/apiConfig";
import { ApiStatusCodes } from "./api/apiStatusCodes";

export {
  constants,
  colors,
  API_END_POINTS,
  BASE_URL,
  CONTENT_TYPES,
  fetchData,
  headersList,
  patchData,
  postData,
  ApiStatusCodes,
};
export type {
  CustomButtonProp,
  CustomFileUploadProp,
  CustomResponse,
  CustomTextAreaProp,
  CustomTextInputProp,
  GenericObjectInterface,
  HeaderProp,
  KeybordEventType,
  UploadFormikProps,
  inputChangeEventType,
  inputKeyDownEventType,
  textAreaChangeEventType,
  ArrayOfStringType,
  lottieAnimProviderProptypes,
  TypeWriterUIPropTypes
};
