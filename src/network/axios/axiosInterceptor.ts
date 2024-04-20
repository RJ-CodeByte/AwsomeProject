import { CommonActions } from '@react-navigation/native';
import ScreenNames from '~/./constants/screenNames';
import { navigationRef } from '~/./helper/NavigationRef';
import { AuthSliceActions } from '~/./service/apis/auth/slice';
import setupStore from '~/./store/store.index';
import { isFalsyValue } from '~/./utils/commonUtils';
import { AxiosInstance } from './axiosInstance';

AxiosInstance.interceptors.request.use(
  (request) => {
    const accessToken =
      setupStore.getState().auth?.userResponse?.accessToken ??
      setupStore.getState().signup?.signupUserRes?.accessToken;
    // console.log('🚀 ~ accessToken:', accessToken);
    const token = accessToken; 
    // console.log('🚀 ~ token:', token);
    if (token !== undefined && isFalsyValue(token)) {
      request.headers.Authorization = `Bearer ${token}`;
    } else {
      delete request.headers.Authorization;
    }
    // console.log('🚀 API request:', request);
    return request;
  },
  (error) => {
    console.log('🚀 ~ error interceptor:', error);
    throw new Error(error);
  },
);

export const handleServerErrors = async (error: any): Promise<Error> => {
  const status = error?.code ? error?.code : error?.response?.status;
  const responseData = error?.response?.data;

  const errorMessage =
    typeof responseData === 'object' && responseData?.message
      ? responseData.message
      : 'Unknown error occurred.';

  switch (status) {
    case 400:
      throw new Error('Request Failed');
    case 404:
      throw new Error('Resource not found.');
    case 500:
      throw new Error('Internal server error. Please try again later.');
    case 502:
      throw new Error('Bad Gateway: Please try again later.');
    default:
      throw new Error(errorMessage);
  }
};

export const clearLocalAuthStore = () => {
  setupStore.dispatch(AuthSliceActions.deleteUser());
  console.log('reset called outside ');
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.SignInForm }],
      }),
    );
  }
};

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // console.log('🚀 ~ error:', error);
    const status = error?.response?.status;
    // console.log('🚀 ~ status:', status);
    if (status !== 200) {
      return await handleServerErrors(error);
    }
    return await Promise.reject(error);
  },
);

export default AxiosInstance;
