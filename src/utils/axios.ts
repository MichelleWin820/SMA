import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppError, APP_INVALID_REQ_MODEL } from '../errors/index.js';
import { uriEncodeObject } from './uri-encode-object.js';

export async function sendRequest<T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    return await axios.request<T>(options);
  } catch (error) {
    const e = error as AxiosError;
    throw new AppError({
      ...APP_INVALID_REQ_MODEL,
      status: e.response?.status || APP_INVALID_REQ_MODEL.status,
      message: e.response?.data?.message || e.message,
      desctiption: e.response?.data?.more_info,
    });
  }
}

export async function postForm<P, R>(url: string, payload: P, options?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
  const data = uriEncodeObject(payload);
  try {
    return await axios.post(url, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      ...options,
    });
  } catch (error) {
    const e = error as AxiosError;
    throw new AppError({
      ...APP_INVALID_REQ_MODEL,
      status: e.response?.status || APP_INVALID_REQ_MODEL.status,
      message: e.response?.data?.message || e.message,
      desctiption: e.response?.data?.more_info,
    });
  }
}
