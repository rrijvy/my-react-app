import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export const AxiosAuth: AxiosInstance = axios.create();

const onRequestConfig = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
  return requestConfig;
};

const onRequestFailed = (error: AxiosError): Promise<AxiosError> => {
  console.log(error);
  return Promise.reject(error);
};

// Add a request interceptor
AxiosAuth.interceptors.request.use(onRequestConfig, onRequestFailed);

const onResponseReceive = (response: AxiosResponse<any, any>) => {
  return response;
};

const onResponseFailed = (error: AxiosError): Promise<AxiosError> => {
  console.log(error);
  return Promise.reject(error);
};

// Add a response interceptor
AxiosAuth.interceptors.response.use(onResponseReceive, onResponseFailed);
