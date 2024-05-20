import { useRecoilState } from "recoil"
import Navbar from "../components/Navbar"
import { dataState } from "../config"
import PieCharts from "../components/PieChart"
import { ResponseType, ValuesPros } from "../types"
import { ChangeEventHandler, useState } from "react"

const Visualize = () => {
  const [visualizeType,setVisualizeType] = useState("")
  const [data] = useRecoilState(dataState);
  const date = new Date();
  const month = date.getMonth() + 1
  const day = date.getDate()
  const currentMonthExpenditure = data.filter((item:ResponseType)=>parseInt(item.date.slice(6,8))===month)
  const todayExpenditure = data.filter((item: ResponseType)=>parseInt(item.date.slice(6,8)) === month && (parseInt(item.date.slice(8,10)) === day))
  let spend = 0;
  let earn = 0;
  if(visualizeType === "Today"){
    todayExpenditure.forEach((item: ResponseType)=>{
      if(item.money >0){
        earn += item.money
      }else{
        spend += item.money
      }
       if(earn < 0){
        earn = 0
       }
       else{
        earn +=spend
        if(earn < 0){
          earn = 0
         }
         else{
          earn += item.money
         }
       }
    })
  }else{
    currentMonthExpenditure.forEach((item: ResponseType)=>{
      if(item.money >0){
        earn += item.money
      }else{
        spend += item.money
        if(earn < 0){
          earn = 0
         }
         else{
          earn += item.money
         }
      }
      
    })
  }
  // if(earn < 0){
  //   earn = 0
  // }
  const values:ValuesPros = {
    Spend: spend,
    Earn: earn
  }
  console.log(values)
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#09090B] text-white">
    <Navbar />
    <div>
      <select className="text-black" onChange={(e:any)=>setVisualizeType(e.target.value)}>
        <option value="">Select</option>
        <option value="Today">Today</option>
        <option value="Month">Month</option>
      </select>
    </div>
    <div>
      {
        visualizeType === "Today"?
        <PieCharts values={values} title="Today Expenditure" />
        :
        <PieCharts values={values} title="Current Month Expenditure" />
      }
    </div>
    </div>
  )
}

export default Visualize