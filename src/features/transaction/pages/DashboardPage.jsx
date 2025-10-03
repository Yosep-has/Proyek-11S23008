import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetAllCashFlows } from '../states/action';
import AddTransactionModal from '../modals/AddTransactionModal';

function DashboardPage() {
  const dispatch = useDispatch();
  const { list: transactions, stats } = useSelector((state) => state.transactions);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Panggil thunk untuk mengambil data dari API saat komponen pertama kali dimuat
    dispatch(asyncGetAllCashFlows());
  }, [dispatch]);

  // Format angka ke format Rupiah
  const formatCurrency = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Dashboard Arus Kas</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-lg me-2"></i>Tambah Transaksi
        </button>
      </div>

      {/* Tampilkan Stats */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Pemasukan</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.total_inflow || 0)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Total Pengeluaran</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.total_outflow || 0)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">Saldo Akhir</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.cashflow || 0)}</p>
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