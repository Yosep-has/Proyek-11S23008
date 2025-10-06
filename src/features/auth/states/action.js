import apiHelper from '../../../helpers/apiHelper';
import authApi from '../api/authApi'; // <-- Seharusnya mengimpor dari sini
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
      const token = await authApi.login({ email, password });
      apiHelper.putAccessToken(token);
      dispatch(setAuthUserActionCreator({ token }));
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