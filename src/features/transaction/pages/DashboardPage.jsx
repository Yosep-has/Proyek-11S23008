import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncGetAllCashFlows, asyncDeleteCashFlow } from '../states/action';
import { asyncUnsetAuthUser } from '../../auth/states/action';
import AddTransactionModal from '../modals/AddTransactionModal';

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: transactions, stats } = useSelector((state) => state.transactions);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    dispatch(asyncGetAllCashFlows());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser(navigate));
  };

  const handleDelete = (id) => {
    dispatch(asyncDeleteCashFlow(id));
  };

  const formatCurrency = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number || 0);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Dashboard Arus Kas</h1>
        <div>
          <button className="btn btn-primary me-2" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-plus-lg me-2"></i>Tambah Transaksi
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </div>

      {/* Tampilkan Stats */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Pemasukan</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.total_inflow)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Total Pengeluaran</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.total_outflow)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Saldo Akhir</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.cashflow)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tampilkan Daftar Transaksi */}
      <h4>Riwayat Transaksi</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Deskripsi</th>
            <th>Label</th>
            <th>Tipe</th>
            <th className="text-end">Nominal</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((trx) => (
            <tr key={trx.id}>
              <td>{trx.description}</td>
              <td><span className="badge bg-secondary">{trx.label}</span></td>
              <td>
                <span className={`badge ${trx.type === 'inflow' ? 'bg-success-subtle text-success-emphasis' : 'bg-danger-subtle text-danger-emphasis'}`}>
                  {trx.type}
                </span>
              </td>
              <td className={`text-end fw-medium ${trx.type === 'inflow' ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(trx.nominal)}
              </td>
              <td className="text-center">
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(trx.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Panggil Modal */}
      <AddTransactionModal show={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}

export default DashboardPage;