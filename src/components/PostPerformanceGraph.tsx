'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PostPerformanceGraphProps {
  dailyEngagement: Record<string, { likes: number; shares: number; comments: number }>;
}

export function PostPerformanceGraph({ dailyEngagement }: PostPerformanceGraphProps) {
  const dates = Object.keys(dailyEngagement).sort();
  
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Likes',
        data: dates.map(date => dailyEngagement[date].likes),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Shares',
        data: dates.map(date => dailyEngagement[date].shares),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Comments',
        data: dates.map(date => dailyEngagement[date].comments),
        borderColor: '#FFCE56',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 4,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: (value: number) => {
            if (value >= 1000) {
              return (value / 1000).toString() + 'k';
            }
            return value;
          }
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Post Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

export default PostPerformanceGraph;