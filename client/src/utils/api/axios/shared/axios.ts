import axios, { AxiosRequestConfig } from "axios";
import { Result } from "../types";

const axiosInstance = axios.create();

export const api = async <T = unknown>(
  url: string,
  options?: AxiosRequestConfig
): Promise<Result<T>> => {
  try {
    const response = await axiosInstance(url, options);
    return {
      status: response.status,
      resolved: true,
      data: response.data,
    };
  } catch (e: any) {
    console.error(
      `API FAILED WITH STATUS ${e.response?.status || 503}`,
      e.response?.data
    );

    return {
      status: e.response?.status || 503,
      resolved: false,
      error: e.response?.data || null,
    };
  }
};
