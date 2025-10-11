import apiHelper from '../../../helpers/apiHelper';
import authApi from '../api/authApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

export function setAuthUserActionCreator(authUser) {
  return { type: ActionType.SET_AUTH_USER, payload: authUser };
}

export function unsetAuthUserActionCreator() {
  return { type: ActionType.UNSET_AUTH_USER };
}

// Thunk untuk proses login
export function asyncSetAuthUser({ email, password }, navigate) {
  return async (dispatch) => {
    try {
      // data sekarang berisi { token, user }
      const { token, user } = await authApi.login({ email, password });
      apiHelper.putAccessToken(token);
      // Kirim data 'user' ke reducer
      dispatch(setAuthUserActionCreator(user));
      navigate('/');
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

// Thunk untuk proses logout
export function asyncUnsetAuthUser(navigate) {
    return (dispatch) => {
        apiHelper.putAccessToken('');
        dispatch(unsetAuthUserActionCreator());
        navigate('/auth/login');
    };
}

// Thunk untuk registrasi
export function asyncRegisterUser({ name, email, password }, navigate) {
  return async () => {
    try {
      const message = await authApi.register({ name, email, password });
      showSuccessDialog(message);
      navigate('/auth/login');
    } catch (error) {
      showErrorDialog(error.message);
    }
  };
}

// FUNGSI BARU: Untuk memuat sesi pengguna saat refresh halaman
export function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = apiHelper.getAccessToken();
      if (token) {
        const user = await authApi.getOwnProfile();
        dispatch(setAuthUserActionCreator(user));
      }
    } catch (error) {
      // Jika token tidak valid, logout pengguna
      dispatch(asyncUnsetAuthUser(() => {}));
    }
  };
}