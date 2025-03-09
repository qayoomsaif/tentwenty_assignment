import axios, {AxiosError, AxiosResponse} from 'axios';
import Config from 'react-native-config';
import _ from 'lodash';
import {ApiResponse, CustomAxiosError} from '@schemas/apiResponse';

export const client = () => {
  // console.log('Config.BASE_URL:', Config.BASE_URL);
  // console.log('Config.API_KEY:', Config.API_KEY);

  let client = axios.create({
    baseURL: Config.BASE_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  // Request Interceptor
  client.interceptors.request.use(
    async config => {
      let _config = _.cloneDeep(config);

      // Ensure params exist and add the API key
      _config.params = {
        ...(_config.params || {}),
        api_key: Config.API_KEY ?? '6ecd8cdc320db7e262390d6997b64fed',
      };
      // console.log('Final Params:', _config.params);
      return _config;
    },
    (error: CustomAxiosError) => {
      console.error('Request setup error:', error.message);
      return Promise.reject(error);
    },
  );

  // Response Interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // console.log('API Response:', response?.data ?? response);
      return response?.data ?? response;
    },
    (error: CustomAxiosError) => {
      if (error.response) {
        console.error('Response Error Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }

      return Promise.reject(error);
    },
  );

  return client;
};