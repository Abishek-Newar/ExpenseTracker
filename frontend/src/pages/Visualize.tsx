
import { useRecoilState } from "recoil"
import Navbar from "../components/Navbar"
import PieCharts from "../components/PieChart"
import { dataState, expenditureTypeState } from "../config"
import { Maps, ResponseType, ValuesPros } from "../types"

const Visualize = () => {
  const [expenditureType,setExpenditureType] = useRecoilState(expenditureTypeState)
  const [data] = useRecoilState(dataState);
  const date = new Date();
  const month = date.getMonth() + 1
  const day = date.getDate()
  const today = date.getDay()
  console.log(today)
  const MonthLength = [31,28,31,30,31,30,31,31,30,31,30,31];
  // const monthlyExpenditure = data.filter((item:ResponseType)=>( ((parseInt(item.date.slice(6,8)) === month+1) && 
  //                                                                  (parseInt(item.date.slice(8,10)) <= day)) ||
  //                                                                  ((parseInt(item.date.slice(6,8)) === month) &&
  //                                                                  (parseInt(item.date.slice(8,10)) >= day))) )
  // const currentMonthExpenditure = data.filter((item:ResponseType)=>parseInt(item.date.slice(6,8))===month)
  const todayExpenditure = data.filter((item: ResponseType)=>parseInt(item.date.slice(6,8)) === month && (parseInt(item.date.slice(8,10)) === day))
  let tempMonth = month
  let tempDay = day
  let LineChartData:Maps = new Map()
  while(tempMonth>=month-2 || (tempMonth === month-2 && day >= tempDay)){
      let tempSpend = 0;
      data.forEach((item:ResponseType)=>{
          if((parseInt(item.date.slice(8,10)) === tempDay) && 
             (parseInt(item.date.slice(6,8)) === tempMonth + 1) ){
              tempSpend += item.money
          }
      })
      LineChartData.set(tempDay,tempSpend)
      if(tempDay === 1){
          tempDay = MonthLength[tempMonth-1]
          tempMonth--;
      }else{
          tempDay--;
      }
  }
  console.log(LineChartData)
  const Expenditures = Array.from(LineChartData.values())
  let spend = 0;
  let earn = 0;
  // if(earn < 0){
  //   earn = 0
  // }
  if(expenditureType==="month"){
    Expenditures.forEach((item)=>{
      if(item >0){
        earn += item
      }else{
        spend += item
      }
      })
      if(spend < earn){
      earn += spend
      }else{
      earn = 0
      }
  }else if(expenditureType==="week"){
    for(let i=0;i<7;i++){
      if(Expenditures[i] >0){
        earn += Expenditures[i]
      }else{
        spend += Expenditures[i]
      }
      }
      if(spend < earn){
      earn += spend
      }else{
      earn = 0
      }
    }else{
      todayExpenditure.forEach((item:ResponseType)=>{
        if(item.money >0){
          earn += item.money
        }else{
          spend += item.money
        }
        })
        if(spend < earn){
        earn += spend
        }else{
        earn = 0
        }
    }
  const values:ValuesPros = {
    Spend: spend,
    Earn: earn
  }
  console.log(values)
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#09090B] text-white">
    <Navbar />
    <div className="text-white mt-[17vh] flex flex-col gap-6 border rounded-md p-6 ">
      <div className="text-white">
        <ul className="flex justify-around cursor-pointer">
          <li onClick={()=>setExpenditureType('month')} >Month</li>
          <li onClick={()=>setExpenditureType('today')}>Today</li>
          <li onClick={()=>setExpenditureType('week')}>Weekly</li>
        </ul>
      </div>
      <div>
      <PieCharts values={values} title={`${expenditureType} Expenditure`} />
      </div>
    </div>
    </div>
  )
}

export default Visualize

