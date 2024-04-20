import Axios from 'axios';
import Network from '~/./constants/network';

export const AxiosInstance = Axios.create({
  baseURL: Network.baseUrl,
  headers: {},
});
