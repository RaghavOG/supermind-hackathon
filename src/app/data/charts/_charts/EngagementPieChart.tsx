/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EngagementPieChartProps {
  likes: number;
  shares: number;
  comments: number;
  saves: number;

  profileVisits: number;
}

export function EngagementPieChart({
  likes,
  shares,
  comments,
  saves,

  profileVisits
}: EngagementPieChartProps) {
  const data = {
    labels: [
      'Likes',
      'Shares',
      'Comments',
      'Saves',
      'Profile Visits'
    ],
    datasets: [
      {
        data: [likes, shares, comments, saves, profileVisits],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        borderWidth: 1,
        borderColor: Array(5).fill('#fff')
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Engagement Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Direct engagement metrics comparison
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px] flex items-center justify-center">
          <Pie data={data} options={options} />
        </div>
        
      </CardContent>
    </Card>
  );
}