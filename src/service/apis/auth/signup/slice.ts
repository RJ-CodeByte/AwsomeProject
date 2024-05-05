import { createAsyncThunk } from '@reduxjs/toolkit';
import { signupApi, uploadPhotoApi as uploadProfileApi } from '..';
import { Utility } from '~/./././utils/commonUtils';

export const SignUpApiAction = createAsyncThunk(
  'SignUpApiAction',
  async (params: ISignUpReq) => {
    const response = await signupApi(params);
    console.log('🚀 ~SignUpApiAction response:', Utility.formatJson(response));
    return response;
  },
);

export const UploadProfileAction = createAsyncThunk(
  'UploadPhotoAPI',
  async (params: IUploadProfileReq) => {
    const response = await uploadProfileApi(params);
    console.log(
      // '🚀 ~UploadProfileAction response:',
      Utility.formatJson(response),
    );
    return response;
  },
);


