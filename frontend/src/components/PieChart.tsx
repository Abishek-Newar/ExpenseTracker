import { Pie } from "react-chartjs-2"
import 'chartjs-plugin-datalabels';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const PieCharts = ({values,title}) => {
    const data = {
        labels: ["Spend","Earn"],
        datasets: [
            {
              label: '# of Votes',
              data: Object.values(values),
              backgroundColor: [
                '#EF4444',
                '#22C55E',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
        ],
    }
    
  return (
    <div className="text-white mt-[17vh] flex flex-col gap-6 border rounded-md p-6 ">
        <div className="w-[450px]  h-[450px]">
        <Pie data={data}  /> 
        </div>
        <div className="flex items-center gap-10">
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-red-500 block"></span><span>Spend</span></span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 block"></span><span>Earn</span></span>
        </div>
        <div>
            <h1 className="text-center">{title}</h1>
        </div>
    
    </div>
  )
}

export default PieCharts