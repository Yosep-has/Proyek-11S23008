import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Kita perlu action & reducer baru, untuk sementara kita tampilkan dari list yang ada
// import { asyncGetDetailCashFlow } from '../states/action';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Untuk efisiensi, kita cari transaksi dari daftar yang sudah ada di Redux
  const transaction = useSelector(state => 
    state.transactions.list.find(trx => trx.id === Number(id))
  );

  const formatCurrency = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number || 0);
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (!transaction) {
    return (
      <div className="container text-center py-5">
        <h4>Transaksi tidak ditemukan.</h4>
        <Link to="/">Kembali ke Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Detail Transaksi #{transaction.id}</h3>
            </div>
            <div className="card-body">
              <h4 className="card-title">{transaction.description}</h4>
              <p className={`fs-2 fw-bold ${transaction.type === 'inflow' ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(transaction.nominal)}
              </p>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Tipe:</strong> <span className={`badge ${transaction.type === 'inflow' ? 'bg-success' : 'bg-danger'}`}>{transaction.type}</span></p>
                  <p><strong>Label:</strong> <span className="badge bg-secondary">{transaction.label}</span></p>
                </div>
                <div className="col-md-6">
                  <p><strong>Sumber Dana:</strong> {transaction.source}</p>
                  <p><strong>Tanggal:</strong> {formatDate(transaction.created_at)}</p>
                </div>
              </div>
            </div>
            <div className="card-footer text-end">
                <Link to="/" className="btn btn-secondary">
                    Kembali ke Dashboard
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;