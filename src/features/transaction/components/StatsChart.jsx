import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StatsChart({ title, statsData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title },
    },
  };

  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Pemasukan',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Pengeluaran',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  if (statsData && statsData.stats_inflow) {
    const periods = Object.keys(statsData.stats_inflow);
    chartData.labels = periods;
    chartData.datasets[0].data = periods.map(p => statsData.stats_inflow[p]);
    chartData.datasets[1].data = periods.map(p => statsData.stats_outflow[p]);
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {chartData.labels.length > 0 ? (
          <Line options={options} data={chartData} />
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">Memuat data grafik...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsChart;