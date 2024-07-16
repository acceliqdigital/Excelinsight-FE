import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  CustomResponse,
  GenericObjectInterface,
} from "@/utilities/commonInterface/index";

/* eslint-disable no-useless-catch */
let BASE_URL = "";
// BASE_URL = "http://10.44.17.18:8001/";
// BASE_URL = 'http://10.44.22.83:8008/'
// BASE_URL = "http://localhost:8008/";
if (import.meta.env.DEV) {
//   BASE_URL = 'http://10.44.28.182:8008/'
  BASE_URL = "http://localhost:8008/";
} else {
  //   BASE_URL = 'http://10.44.17.18:8001/'
  BASE_URL = "http://localhost:8008/";
}

const headersList = {
  Accept: "*/*",
  "Content-Type": "application/x-www-form-urlencoded",
};

const CONTENT_TYPES = {
  APPLICATION_JSON: "application/json",
  FORM_DATA: "multipart/form-data",
};

const API_END_POINTS = {
  LOGIN: "api/login/",
  SIGNUP: "api/register/",
  INSIGHT_EXCEL_UPLOAD: "insights/files/",
  INSIGHT_EXCEL_FILTER: "insights/filter/",
  EXCEL_CHATS: "chat/ask/",
};

const makeApiRequest = async <T>(
  method: AxiosRequestConfig["method"],
  headers: GenericObjectInterface,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  endPoint: string,
  baseUrl?: string
): Promise<AxiosResponse<T>> => {
  try {
    const requestURL = `${baseUrl ? baseUrl : BASE_URL}${endPoint}`;
    const response: AxiosResponse<T> = await axios({
      method: method,
      headers: headers,
      url: requestURL,
      data: data,
      // withCredentials: true,
      // withXSRFToken: true
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const postData = async <T>(
  headers: GenericObjectInterface,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  endPoint: string,
  baseUrl?: string
): Promise<CustomResponse<T>> => {
  try {
    const response = await makeApiRequest<T>(
      "POST",
      headers,
      data,
      endPoint,
      baseUrl
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchData = async <T>(
  headers: GenericObjectInterface,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  endPoint: string,
  baseUrl?: string
): Promise<CustomResponse<T>> => {
  try {
    const response = await makeApiRequest<T>(
      "GET",
      headers,
      data,
      endPoint,
      baseUrl
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const patchData = async <T>(
  headers: GenericObjectInterface,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  endPoint: string,
  baseUrl?: string
): Promise<CustomResponse<T>> => {
  try {
    const response = await makeApiRequest<T>(
      "PATCH",
      headers,
      data,
      endPoint,
      baseUrl
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  BASE_URL,
  postData,
  fetchData,
  patchData,
  API_END_POINTS,
  headersList,
  CONTENT_TYPES,
};
