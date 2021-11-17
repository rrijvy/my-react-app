import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export const Axios: AxiosInstance = axios.create();

const onRequestConfig = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
  return requestConfig;
};

const onRequestFailed = (error: AxiosError): Promise<AxiosError> => {
  console.log(error);
  return Promise.reject(error);
};

// Add a request interceptor
Axios.interceptors.request.use(onRequestConfig, onRequestFailed);

const onResponseReceive = (response: AxiosResponse<any, any>) => {
  return response;
};

const onResponseFailed = (error: AxiosError): Promise<AxiosError> => {
  console.log(error);
  return Promise.reject(error);
};

// Add a response interceptor
Axios.interceptors.response.use(onResponseReceive, onResponseFailed);
