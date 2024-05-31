import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { Chart, ArcElement, Legend } from 'chart.js';
import { PiePros } from "../types";
Chart.register(ArcElement, Legend);


const PieCharts = ({values,title}:PiePros) => {
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
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          title:{
              display: true,
              text: "Monthly-Expenditure (Doughnut Chart)",
          },
        legend: {
          display: true, // Set to false to disable the legend
          position: 'bottom',
        },
        
        
      },
    };
    
  return (
    <div className="">
        <div className="w-[450px]  h-[450px]">
        {
          values.Earn === 0 && values.Spend === 0?
          <div className='text-center pt-[40%]'>NO SPEND OR EARNING TODAY</div>:
          <Doughnut data={data}  /> 
        }
        </div>
        <div>
            <h1 className="text-center uppercase">{title}</h1>
        </div>
    
    </div>
  )
}

export default PieCharts