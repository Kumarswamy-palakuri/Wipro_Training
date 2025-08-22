import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function StockChart({ points }) {
  const labels = points.map(p => new Date(p.time).toLocaleTimeString());
  const data = {
    labels,
    datasets: [{
      label: 'Price',
      data: points.map(p => p.price),
      borderColor: 'rgba(58,160,255,0.9)',
      backgroundColor: 'rgba(58,160,255,0.2)',
      pointRadius: 0,
      tension: 0.25
    }]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: 'var(--text)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: 'var(--text)' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    },
    plugins: {
      legend: { labels: { color: 'var(--text)' } },
      tooltip: { mode: 'index', intersect: false }
    }
  };

  return (
    <div style={{ height: 280 }}>
      <Line data={data} options={options} />
    </div>
  );
}
