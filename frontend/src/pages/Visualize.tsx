import { useRecoilState } from "recoil"
import Navbar from "../components/Navbar"
import { dataState } from "../config"
import PieCharts from "../components/PieChart"
import { ResponseType } from "../types"

const Visualize = () => {
  const [data] = useRecoilState(dataState);
  const date = new Date();
  const month = date.getMonth()
  const day = date.getDate()
  console.log(day)
  const currentMonthExpenditure = data.filter((item:ResponseType)=>parseInt(item.date.slice(6,8))===month+1)
  let spend = 0;
  let earn = 0;
  currentMonthExpenditure.forEach((item: ResponseType)=>{
    if(item.money >0){
      earn += item.money
    }else{
      spend += item.money
    }
  })
  const values = {
    Spend: spend,
    Earn: earn
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#09090B] text-white">
    <Navbar />
    <div>
      <PieCharts values={values} title="Current Month Expenditure" />
    </div>
    </div>
  )
}

export default Visualize