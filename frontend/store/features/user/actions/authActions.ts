import { postAuthToken } from '@/api/authAdaptor';
import { AppThunk } from '@/store/store';
import { AuthData } from '@/types/api';
import { AxiosError, AxiosResponse } from 'axios';
import { setError, setStatusError, setStatusLoading, setStatusSuccess } from '../reducers/slices/authSliceReducer';
const Cookies = require('js-cookie');
const TOKEN_COOKIE = 'auth_token';

export const getAuth = (formData: FormData): AppThunk => (dispatch) => {
  try {
    dispatch(setStatusLoading());
    postAuthToken(formData).then((response) => {

      if (response.status === 200) {
        dispatch(getAuthSuccess((<AxiosResponse<AuthData>>response).data));
        return;
      } else {
        dispatch(getAuthFail((<AxiosError>response).message || 'authentication failed'));
      }
    });

  } catch (error) {
    dispatch(getAuthFail(error instanceof Error ? error.message : 'authentication failed'));
  }
};

export const getAuthSuccess = (data: AuthData): AppThunk => (dispatch) => {
  Cookies.set(TOKEN_COOKIE, data.token!, { sameSite: 'none', secure: true });
  dispatch(setStatusSuccess());
};

export const getAuthFail = (errorMessage: string): AppThunk => (dispatch) => {
  dispatch(setError(errorMessage));
  dispatch(setStatusError());
};