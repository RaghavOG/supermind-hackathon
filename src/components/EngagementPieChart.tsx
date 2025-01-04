'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface EngagementPieChartProps {
  likes: number;
  shares: number;
  comments: number;
}

export function EngagementPieChart({ likes, shares, comments }: EngagementPieChartProps) {
  const data = {
    labels: ['Likes', 'Shares', 'Comments'],
    datasets: [
      {
        data: [likes, shares, comments],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
        borderColor: ['#fff', '#fff', '#fff']
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Engagement Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] flex items-center justify-center">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

export default EngagementPieChart;