import { Outlet, NavLink, useLocation } from 'react-router-dom';

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-header p-0">
              {/* Navigasi Tab */}
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
              {/* Outlet akan merender LoginPage atau RegisterPage */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;