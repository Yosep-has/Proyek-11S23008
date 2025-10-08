import { useMemo } from 'react';

function DailyBook({ transactions, selectedDate, formatCurrency, formatDate }) {
  const dailyStats = useMemo(() => {
    return transactions.reduce((acc, trx) => {
      if (trx.type === 'inflow') {
        acc.totalInflow += trx.nominal;
      } else {
        acc.totalOutflow += trx.nominal;
      }
      return acc;
    }, { totalInflow: 0, totalOutflow: 0 });
  }, [transactions]);

  return (
    <div className="card shadow-sm mt-3">
      <div className="card-header bg-light">
        <h4 className="card-title mb-0">
          Buku Harian: {formatDate(selectedDate)}
        </h4>
      </div>
      <div className="card-body">
        {transactions.length > 0 ? (
          <>
            <div className="table-responsive mb-3">
              <table className="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Deskripsi</th>
                    <th>Label</th>
                    <th className="text-end">Pemasukan</th>
                    <th className="text-end">Pengeluaran</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((trx) => (
                    <tr key={trx.id}>
                      <td>{trx.description}</td>
                      <td><span className="badge bg-secondary">{trx.label}</span></td>
                      <td className="text-end text-success">
                        {trx.type === 'inflow' ? formatCurrency(trx.nominal) : '-'}
                      </td>
                      <td className="text-end text-danger">
                        {trx.type === 'outflow' ? formatCurrency(trx.nominal) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <div className="text-end">
                <p className="mb-1">
                  <strong>Total Pemasukan:</strong>
                  <span className="text-success ms-2 fw-bold">{formatCurrency(dailyStats.totalInflow)}</span>
                </p>
                <p className="mb-1">
                  <strong>Total Pengeluaran:</strong>
                  <span className="text-danger ms-2 fw-bold">{formatCurrency(dailyStats.totalOutflow)}</span>
                </p>
                <hr className="my-2" />
                <p className="mb-0 fs-5">
                  <strong>Arus Kas Harian:</strong>
                  <strong className={`ms-2 ${dailyStats.totalInflow - dailyStats.totalOutflow >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatCurrency(dailyStats.totalInflow - dailyStats.totalOutflow)}
                  </strong>
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-muted py-4 mb-0">
            Tidak ada transaksi pada tanggal ini.
          </p>
        )}
      </div>
    </div>
  );
}

export default DailyBook;