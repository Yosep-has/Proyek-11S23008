import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './features/transaction/pages/DashboardPage';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import AuthLayout from './features/auth/layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import DetailPage from './features/transaction/pages/DetailPage';
import { asyncPreloadProcess } from './features/auth/states/action';

function App() {
  const dispatch = useDispatch();

  // Jalankan proses preload saat aplikasi dimuat
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <Routes>
      {/* Rute Publik untuk Login & Daftar */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Rute Terproteksi untuk Aplikasi Utama */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="transaction/:id" element={<DetailPage />} />
      </Route>

      {/* Jika user membuka path lain, arahkan ke halaman utama */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;