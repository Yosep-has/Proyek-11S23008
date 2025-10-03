import { Routes, Route } from 'react-router-dom';
import DashboardPage from './features/transaction/pages/DashboardPage';

function App() {
  return (
    <Routes>
      {/* Atur halaman utama agar menampilkan DashboardPage */}
      <Route path="/" element={<DashboardPage />} />
      {/* Anda bisa menambahkan route lain di sini, misalnya untuk halaman login */}
    </Routes>
  );
}

export default App;