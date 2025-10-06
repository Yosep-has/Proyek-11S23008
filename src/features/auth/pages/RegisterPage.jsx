import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { asyncRegisterUser } from '../states/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleRegister(e) {
    e.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }, navigate));
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-3">
        <label className="form-label">Nama Lengkap</label>
        <input type="text" value={name} onChange={onNameChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Alamat Email</label>
        <input type="email" value={email} onChange={onEmailChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Kata Sandi</label>
        <input type="password" value={password} onChange={onPasswordChange} className="form-control" required />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">Daftar</button>
    </form>
  );
}

export default RegisterPage;