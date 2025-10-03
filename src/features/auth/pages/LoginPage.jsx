import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncSetAuthUser } from '../states/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleLogin(e) {
    e.preventDefault();
    // Dispatch thunk login dan kirim 'navigate' agar bisa redirect
    dispatch(asyncSetAuthUser({ email, password }, navigate));
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label className="form-label">Alamat Email</label>
        <input type="email" value={email} onChange={onEmailChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Kata Sandi</label>
        <input type="password" value={password} onChange={onPasswordChange} className="form-control" required />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">Masuk</button>
    </form>
  );
}

export default LoginPage;