import { Outlet, NavLink } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="container">
      {/* Baris ini penting untuk membuat konten berada di tengah secara vertikal dan horizontal */}
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-header p-0">
              <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/login">
                    Masuk
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/register">
                    Daftar
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="card-body p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;