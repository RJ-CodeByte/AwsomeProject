import Network from '~/././constants/network';
import AxiosInterceptor from '~/././network/axios/axiosInterceptor';

// get state api
// export const getStateApi = async (): Promise<ApiResponseType<StateRes[]>> => {
//   const url = `${Network.endpoints.states}`;
//   const response = await AxiosInterceptor.get(url);
//   return response?.data;
// };

export const getPokemonApi = async (): Promise<Pokemon[]> => {
  const url = `${Network.endpoints.pokemon}?limit=10&offset=0`;
  const response = await AxiosInterceptor.get(url);
  // console.log("🚀 ~ getPokemonApi ~ response:", response)
  return response?.data.results ? response?.data.results : [];
};


export const getPokemonTypeApi = async (Id:number): Promise<PokemonTypes[]> => {
  const url = `${Network.endpoints.pokemon}/${Id}`;
  const response = await AxiosInterceptor.get(url);
  // console.log("🚀 ~ getPokemonTypeApi ~ response:", response.data.types)
  if(response.data.types.length>0){
    return response?.data.types;
  }
};
