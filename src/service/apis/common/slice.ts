import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonApi, getPokemonTypeApi } from '.';

// export const GetStateApiAction = createAsyncThunk(
//   'GetStateApiAction',
//   async () => {
//     const response = await getStateApi();
//     // console.log('🚀 ~getStateApi response:', Utility.formatJson(response));
//     return response;
//   },
// );
export const GetPokemonApiAction = createAsyncThunk(
  'GetStateApiAction',
  async () => {
    const response = await getPokemonApi();
    return response;
  },
);

export const GetPokemonTypeApiAction = createAsyncThunk(
  'GetPokemonTypeApiAction',
  async (Id: number) => {
    const response = await getPokemonTypeApi(Id);
    return response;
  },
);

interface ICommonSlice {
  pokemonRes: Pokemon[] | null;
  pokemonType: PokemonTypes[] | null;
}

const initialState: ICommonSlice = {
  pokemonRes: null,
  pokemonType: null,
};

// reducer
const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetPokemonApiAction.fulfilled, (state, _action) => {
      state.pokemonRes = _action.payload;
    });
    builder.addCase(GetPokemonApiAction.rejected, (state, _action) => {
      throw Error(_action.error.message);
    });
    builder.addCase(GetPokemonTypeApiAction.fulfilled, (state, _action) => {
      state.pokemonType = _action.payload;
    });
    builder.addCase(GetPokemonTypeApiAction.rejected, (state, _action) => {
      throw Error(_action.error.message);
    });
  },
});

export const loaderChange = commonSlice.actions; // for slice reducers
export default commonSlice;
