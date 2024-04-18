import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStateApi } from '.';

export const GetStateApiAction = createAsyncThunk(
  'GetStateApiAction',
  async () => {
    const response = await getStateApi();
    // console.log('🚀 ~getStateApi response:', Utility.formatJson(response));
    return response;
  },
);

interface ICommonSlice {
  stateRes: StateRes[] | null;
}

const initialState: ICommonSlice = {
  stateRes: null,
};

// reducer
const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetStateApiAction.fulfilled, (state, _action) => {
      state.stateRes = _action.payload.data;
    });
    builder.addCase(GetStateApiAction.rejected, (state, _action) => {
      throw Error(_action.error.message);
    });
  },
});

export const loaderChange = commonSlice.actions; // for slice reducers
export default commonSlice;
