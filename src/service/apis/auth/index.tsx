import Network from '~/~/~/constants/network';
import { ApiResponseType } from '~/~/~/types/network';
import AxiosInterceptor from '~/~/~/network/axios/axiosInterceptor';

// create account api
export const signupApi = async (
  params: ISignUpReq,
): Promise<ApiResponseType<SignUpUserRes>> => {
  const url = `${Network.endpoints.signup}`;
  const response = await AxiosInterceptor.post(url, params);
  return response?.data;
};

// upload profile photo
export const uploadPhotoApi = async (
  params: IUploadProfileReq,
): Promise<ApiResponseType<UserResponse>> => {
  const url = `${Network.endpoints.uploadProfile}`;
  console.log('🚀 ~ params:', params);
  console.log('🚀 ~ url:', url);
  let formData = new FormData();
  formData.append('profile', params.profile);
  formData.append('userType', params.userType);
  const response = await AxiosInterceptor.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data;' },
  });
  return response?.data;
};

// Login api
export const loginApi = async (
  params: ILogInReq,
): Promise<ApiResponseType<UserResponse>> => {
  const url = `${Network.endpoints.login}`;
  const response = await AxiosInterceptor.post(url, params);
  return response?.data;
};

// Logout api
export const logoutApi = async (
  params: ILogOutReq,
): Promise<ApiResponseType<UserResponse>> => {
  const url = `${Network.endpoints.logOut}`;
  const response = await AxiosInterceptor.post(url, params);
  return response?.data;
};
