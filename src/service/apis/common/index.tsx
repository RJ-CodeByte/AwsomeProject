import Network from '~/~/~/constants/network';
import { ApiResponseType } from '~/~/~/types/network';
import AxiosInterceptor from '~/~/~/network/axios/axiosInterceptor';

// get state api
export const getStateApi = async (): Promise<ApiResponseType<StateRes[]>> => {
  const url = `${Network.endpoints.states}`;
  const response = await AxiosInterceptor.get(url);
  return response?.data;
};
