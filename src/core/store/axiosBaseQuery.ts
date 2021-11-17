import { ThunkDispatch } from "@reduxjs/toolkit";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import { AxiosAuth } from "../axios/AxiosAuth";

type BaseUrl = {
  baseUrl: string;
};

type Args = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
};

export interface BaseQueryApi {
  signal: AbortSignal;
  dispatch: ThunkDispatch<any, any, any>;
  getState: () => unknown;
}

export const axiosBaseQuery =
  (baseUrl: BaseUrl): BaseQueryFn<Args, unknown, unknown> =>
  async ({ url, method, data }) => {
    try {
      const result = await AxiosAuth({ url: baseUrl.baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
