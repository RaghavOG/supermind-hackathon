import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PostTypeComparisonProps {
  engagementByType: Array<{
    type: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
    avgSaves: number;
    avgImpressions: number;
    avgReach: number;
    avgEngagementRate: number;
  }>;
}

export function PostTypeComparison({ engagementByType }: PostTypeComparisonProps) {
  const data = {
    labels: engagementByType.map(item => item.type),
    datasets: [
      {
        label: 'Avg Likes',
        data: engagementByType.map(item => item.avgLikes),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Avg Comments',
        data: engagementByType.map(item => item.avgComments),
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Avg Shares',
        data: engagementByType.map(item => item.avgShares),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Avg Saves',
        data: engagementByType.map(item => item.avgSaves),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${context.dataset.label}: ${value.toLocaleString(undefined, { 
              maximumFractionDigits: 0 
            })}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: (value: number) => {
            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
            return value;
          }
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Post Type Performance</CardTitle>
        <p className="text-sm text-muted-foreground">
          Average engagement metrics by post type
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}