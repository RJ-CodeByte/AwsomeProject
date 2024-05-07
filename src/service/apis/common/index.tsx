import Network from '~/././constants/network';
import AxiosInterceptor from '~/././network/axios/axiosInterceptor';


export const getPokemonApi = async (page:number): Promise<Pokemon[]> => {
  const offset = (page-1) * 20
  // console.log("Offset",offset)
  const url = `${Network.endpoints.pokemon}?limit=10&offset=${offset}`;
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
  }else{
    return response?.data.types
  }
};
