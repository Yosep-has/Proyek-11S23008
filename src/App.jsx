import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './features/transaction/pages/DashboardPage';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage'; // <-- 1. Impor komponen baru
import AuthLayout from './features/auth/layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      {/* Rute Publik untuk Login & Daftar */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} /> {/* <-- 2. Tambahkan rute ini */}
      </Route>

      {/* Rute Terproteksi untuk Aplikasi Utama */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>

      {/* Jika user membuka path lain, arahkan ke halaman utama */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;