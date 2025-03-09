import {AxiosError, AxiosResponse} from 'axios';

export interface CustomAxiosError<T = any> extends AxiosError<T> {
  response?: AxiosResponse<T>; // Use AxiosResponse to ensure compatibility
}

export interface ApiResponse {
  message: string;
  data: any;
  status: number;
  errors: [];
  code: string;
  pagination: null;
  endpoint: null;
}
