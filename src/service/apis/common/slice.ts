import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonApi, getPokemonTypeApi } from '.';
import setupStore from '~/store/store.index';

export const GetPokemonApiAction = createAsyncThunk(
  'GetPokemonApiAction',
  async (page:number) => {
    const response = await getPokemonApi(page);
    const prvRes = setupStore.getState().common.pokemonRes;
      if(response.length > 0 && page>1 && prvRes){
        const res= [...prvRes, ...response]
        return res
      }else{
        return response;
      }
    
  },
);

export const GetPokemonTypeApiAction = createAsyncThunk(
  'GetPokemonTypeApiAction',
  async (Id: number) => {
    const response = await getPokemonTypeApi(Id);
    // console.log("🚀 ~ response:", response)
    return response;
  },
);


interface ICommonSlice {
  pokemonRes: Pokemon[] | null;
  // pokemonType: PokemonTypes[] | null;
}

const initialState: ICommonSlice = {
  pokemonRes: null,
  // pokemonType: null,
};

// reducer
const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    updatePockemonRes:(state,action)=>{
      state.pokemonRes = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(GetPokemonApiAction.fulfilled, (state, _action) => {
      state.pokemonRes = _action.payload;
    });
    builder.addCase(GetPokemonApiAction.rejected, (state, _action) => {
      throw Error(_action.error.message);
    });
  },
});

export const updateRes = commonSlice.actions; // for slice reducers
export default commonSlice;
