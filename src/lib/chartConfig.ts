import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export function registerChartComponents() {
  ChartJS.register(ArcElement, Tooltip, Legend);
}

