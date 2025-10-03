import useInput from '../../../hooks/useInput';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleRegister(e) {
    e.preventDefault();
    // Logika untuk dispatch action register akan ditambahkan di sini
    alert(`Mencoba mendaftar dengan: ${name}, ${email}`);
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