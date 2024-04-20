import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from '.';
import Language from '~/././constants/language';
import { showSnackBar } from '~/././utils/commonUtils';

import { SignUpApiAction, UploadProfileAction } from './signup/slice';

export const LoginApiAction = createAsyncThunk(
  'LoginApiAction',
  async (params: ILogInReq) => {
    const response = await loginApi(params);
    return response;
  },
);

export const LogoutApiAction = createAsyncThunk(
  'LogoutApiAction',
  async (params: ILogOutReq) => {
    const response = await logoutApi(params);
    return response;
  },
);

interface IAuthSlice {
  userResponse: UserResponse | null;
}

const initialState: IAuthSlice = {
  userResponse: null,
};

// reducer
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    deleteUser: (state) => {
      state.userResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginApiAction.fulfilled, (state, _action) => {
      state.userResponse = _action.payload.data;
    });
    builder.addCase(LoginApiAction.rejected, (state, _action) => {
      throw Error(_action.error.message);
    });
    builder.addCase(LogoutApiAction.fulfilled, (state, _action) => {
      console.log('🚀 ~ builder.addCase ~ _action:', _action.payload);
      state.userResponse = null;
    });
    builder.addCase(LogoutApiAction.rejected, (state, _action) => {
      console.log('🚀 ~ builder.rejected ~ _action:', _action.payload);
      throw Error(_action.error.message);
    });
    builder.addCase(SignUpApiAction.fulfilled, (state, _action) => {
      state.userResponse = _action.payload.data;
      showSnackBar(_action.payload.message);
    });
    builder.addCase(SignUpApiAction.rejected, (state, _action) => {
      if (
        _action?.error?.message !== undefined &&
        _action.error.message !== null
      ) {
        showSnackBar(_action?.error?.message?.toString());
        throw Error(_action.error.message);
      } else {
        showSnackBar(Language.Something_Went_Wrong_Pelase_Try_Again);
      }
    });
    builder.addCase(UploadProfileAction.fulfilled, (state, _action) => {
      state.userResponse = _action.payload.data;
      showSnackBar(_action.payload.message);
    });
    builder.addCase(UploadProfileAction.rejected, (state, _action) => {
      if (
        _action?.error?.message !== undefined &&
        _action.error.message !== null
      ) {
        showSnackBar(_action?.error?.message?.toString());
        throw Error(_action.error.message);
      } else {
        showSnackBar(Language.Something_Went_Wrong_Pelase_Try_Again);
      }
    });
  },
});

export const AuthSliceActions = authSlice.actions; // for slice reducers
export default authSlice;
