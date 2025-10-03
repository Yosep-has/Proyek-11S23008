import apiHelper from '../../../helpers/apiHelper';
import authApi from '../api/authApi';
import { showErrorDialog } from '../../../helpers/toolsHelper';

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
      const token = await authApi.login({ email, password });
      apiHelper.putAccessToken(token);

      // Placeholder: Anda bisa mengambil data profil di sini jika perlu
      // Untuk sekarang, kita anggap token saja sudah cukup
      dispatch(setAuthUserActionCreator({ token })); // Simpan token ke state

      navigate('/'); // Arahkan ke dashboard setelah login berhasil
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