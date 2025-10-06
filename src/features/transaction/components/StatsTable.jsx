function StatsTable({ title, statsData, formatCurrency }) {
  // Cek apakah data sudah ada dan tidak kosong
  if (!statsData || !statsData.stats_inflow) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="text-muted">Memuat data statistik...</p>
        </div>
      </div>
    );
  }

  // Ambil semua periode (tanggal/bulan) dari salah satu kunci statistik
  const periods = Object.keys(statsData.stats_inflow);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="table-responsive" style={{ maxHeight: '300px' }}>
          <table className="table table-sm table-hover mb-0">
            <thead>
              <tr>
                <th>Periode</th>
                <th className="text-end">Pemasukan</th>
                <th className="text-end">Pengeluaran</th>
                <th className="text-end">Arus Kas</th>
              </tr>
            </thead>
            <tbody>
              {periods.length > 0 ? periods.map((period) => (
                <tr key={period}>
                  <td>{period}</td>
                  <td className="text-end text-success">
                    {formatCurrency(statsData.stats_inflow[period])}
                  </td>
                  <td className="text-end text-danger">
                    {formatCurrency(statsData.stats_outflow[period])}
                  </td>
                  <td className="text-end fw-bold">
                    {formatCurrency(statsData.stats_cashflow[period])}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">Belum ada data statistik.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatsTable;