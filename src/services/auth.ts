import {ApiResponse} from '@schemas/apiResponse';
import {client} from './client';
import {ENDPOINTS} from './EndPoints';

const apiClient = client();

export const getLocations = async (): Promise<ApiResponse> =>
  await apiClient.get(ENDPOINTS.locations);

export const getOrganization = async (): Promise<ApiResponse> =>
  await apiClient.get(ENDPOINTS.organization);

export const postLogin = async (
  payload: Record<string, unknown>,
): Promise<ApiResponse> => await apiClient.post(ENDPOINTS.login, payload);

export const postOtpVerifications = async (
  payload: Record<string, unknown>,
): Promise<ApiResponse> =>
  await apiClient.post(ENDPOINTS.otpVerification, payload);

export const loginRequest = async (
  payload: Record<string, unknown>,
): Promise<ApiResponse> => await apiClient.post(ENDPOINTS.login, payload);
