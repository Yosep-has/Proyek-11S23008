import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  asyncGetAllCashFlows,
  asyncDeleteCashFlow,
  asyncGetStatsDaily,
  asyncGetStatsMonthly,
} from '../states/action';
import { asyncUnsetAuthUser } from '../../auth/states/action';
import AddTransactionModal from '../modals/AddTransactionModal';
import EditTransactionModal from '../modals/EditTransactionModal';
import StatsTable from '../components/StatsTable';
import DailyBook from '../components/DailyBook';
import StatsChart from '../components/StatsChart';

const getTodayDate = () => new Date().toISOString().split('T')[0];

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    list: allTransactions,
    stats,
    statsDaily,
    statsMonthly,
  } = useSelector((state) => state.transactions);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [showCharts, setShowCharts] = useState(false);

  const dailyTransactions = useMemo(() => {
    return allTransactions.filter(trx => trx.created_at.startsWith(selectedDate));
  }, [selectedDate, allTransactions]);

  const fetchInitialData = useCallback(() => {
    const today = getTodayDate();
    dispatch(asyncGetAllCashFlows());
    dispatch(asyncGetStatsDaily({ end_date: today, total_data: 7 }));
    dispatch(asyncGetStatsMonthly({ end_date: today, total_data: 12 }));
  }, [dispatch]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser(navigate));
  };

  const handleDelete = (id) => {
    dispatch(asyncDeleteCashFlow(id));
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const formatCurrency = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number || 0);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.split(' ')[0]);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="container py-4">
      {/* Header dan Ringkasan Total */}
      <div className="d-flex justify-content-between align-items-center mb-4">
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
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Pemasukan</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.total_inflow)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Pengeluaran</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.total_outflow)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-light shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Saldo Akhir</h5>
              <p className="card-text fs-4 fw-bold">{formatCurrency(stats.cashflow)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pembukuan Harian */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <label htmlFor="date-filter" className="form-label me-3 mb-0 fw-bold fs-5">Pembukuan Harian</label>
                <input
                  type="date"
                  id="date-filter"
                  className="form-control"
                  style={{ width: '220px' }}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <DailyBook
                transactions={dailyTransactions}
                selectedDate={selectedDate}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tombol untuk menampilkan/menyembunyikan grafik */}
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-outline-secondary" onClick={() => setShowCharts(!showCharts)}>
          {showCharts ? 'Sembunyikan Grafik' : 'Tampilkan Grafik'}
        </button>
      </div>

      {/* Bungkus grafik dengan kondisional render */}
      {showCharts && (
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <StatsChart title="Grafik Harian (7 Hari Terakhir)" statsData={statsDaily} />
          </div>
          <div className="col-lg-6 mb-3">
            <StatsChart title="Grafik Bulanan (12 Bulan Terakhir)" statsData={statsMonthly} />
          </div>
        </div>
      )}

      {/* Statistik 7 Hari & 12 Bulan (Tabel) */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-3">
          <StatsTable
            title="Statistik Harian (7 Hari Terakhir)"
            statsData={statsDaily}
            formatCurrency={formatCurrency}
          />
        </div>
        <div className="col-lg-6 mb-3">
          <StatsTable
            title="Statistik Bulanan (12 Bulan Terakhir)"
            statsData={statsMonthly}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      {/* Riwayat Semua Transaksi */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title">Semua Riwayat Transaksi</h4>
          <div className="table-responsive" style={{ maxHeight: '400px' }}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Label</th>
                  <th>Tipe</th>
                  <th className="text-end">Nominal</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions && allTransactions.length > 0 ? allTransactions.map((trx) => (
                  <tr key={trx.id}>
                    <td>{formatDate(trx.created_at)}</td>
                    <td>
                        <Link to={`/transaction/${trx.id}`}>{trx.description}</Link>
                    </td>
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
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(trx)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(trx.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">Belum ada riwayat transaksi.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddTransactionModal show={showAddModal} onClose={handleModalClose} />
      <EditTransactionModal show={showEditModal} onClose={handleModalClose} transaction={selectedTransaction} />
    </div>
  );
}

export default DashboardPage;