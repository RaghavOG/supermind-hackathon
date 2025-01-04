'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface EngagementGrowthProps {
  dailyEngagement: Record<string, { likes: number; shares: number; comments: number }>;
}

export function EngagementGrowth({ dailyEngagement }: EngagementGrowthProps) {
  const dates = Object.keys(dailyEngagement).sort();
  
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Total Engagement',
        data: dates.map(date => 
          dailyEngagement[date].likes + 
          dailyEngagement[date].shares + 
          dailyEngagement[date].comments
        ),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
        pointRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Total Engagement: ${context.raw.toLocaleString()}`
        }
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
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Engagement Growth Over Time</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}