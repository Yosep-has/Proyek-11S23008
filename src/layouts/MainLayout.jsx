import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import apiHelper from '../helpers/apiHelper'; // Asumsi Anda punya file ini

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
      {/* Di sini Anda bisa menaruh Navbar jika ada */}
      <main>
        <Outlet /> {/* Ini akan merender DashboardPage atau halaman terproteksi lainnya */}
      </main>
    </div>
  );
}

export default MainLayout;