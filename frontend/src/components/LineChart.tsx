
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
import { Line } from 'react-chartjs-2';
import { Maps } from '../types';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface LineProps{
  LineChartData: Maps
}

export function LineChart({LineChartData}:LineProps) {
  const labelData = Array.from(LineChartData.keys())
  const labels = labelData.reverse()
  const LineData = Array.from (LineChartData.values())
 const data = {
  labels,
  datasets: [
    {
      label: 'Last 30 Days Spends',
      data: LineData.reverse(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  return <Line  data={data} />;
}
