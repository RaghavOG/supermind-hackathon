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
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DailyEngagement {
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  impressions: number;
  reach: number;
  profileVisits: number;
  engagementRate: number;
  followerCount: number;
}

interface PostPerformanceGraphProps {
  dailyEngagement: Record<string, DailyEngagement>;
}

export function PostPerformanceGraph({ dailyEngagement }: PostPerformanceGraphProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'likes',
    'comments',
    'shares',
    'saves'
  ]);

  const dates = Object.keys(dailyEngagement).sort();
  
  const metricsConfig = {
    likes: { color: '#FF6384', label: 'Likes' },
    shares: { color: '#36A2EB', label: 'Shares' },
    comments: { color: '#FFCE56', label: 'Comments' },
    saves: { color: '#4BC0C0', label: 'Saves' },
    impressions: { color: '#9966FF', label: 'Impressions' },
    reach: { color: '#FF9F40', label: 'Reach' },
    profileVisits: { color: '#8AC926', label: 'Profile Visits' },
    engagementRate: { color: '#FF6B6B', label: 'Engagement Rate' }
  };

  const data = {
    labels: dates,
    datasets: selectedMetrics.map(metric => ({
      label: metricsConfig[metric as keyof typeof metricsConfig].label,
      data: dates.map(date => dailyEngagement[date][metric as keyof DailyEngagement]),
      borderColor: metricsConfig[metric as keyof typeof metricsConfig].color,
      backgroundColor: `${metricsConfig[metric as keyof typeof metricsConfig].color}1A`,
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      yAxisID: metric === 'engagementRate' ? 'percentage' : 'absolute'
    }))
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
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const metric = selectedMetrics[context.datasetIndex];
            if (metric === 'engagementRate') {
              return `${context.dataset.label}: ${value.toFixed(1)}%`;
            }
            return `${context.dataset.label}: ${value.toLocaleString()}`;
          }
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
      absolute: {
        type: 'linear' as const,
        position: 'left' as const,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: (value: number) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
            return value;
          }
        }
      },
      percentage: {
        type: 'linear' as const,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value: number) => `${value.toFixed(1)}%`
        }
      }
    }
  };

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Post Performance Over Time</CardTitle>
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(metricsConfig).map(([metric, config]) => (
            <button
              key={metric}
              onClick={() => toggleMetric(metric)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedMetrics.includes(metric)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}