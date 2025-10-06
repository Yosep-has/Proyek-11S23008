import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import apiHelper from '../helpers/apiHelper';

function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah ada token di localStorage
    const token = apiHelper.getAccessToken();
    if (!token) {
      // Jika tidak ada token, paksa kembali ke halaman login
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <div>
      <main>
        {/* Outlet akan merender DashboardPage setelah token dipastikan ada */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;