import { useRecoilState } from "recoil";
import { dataState } from "../config";
import { ResponseType } from "../types";
import Navbar from "../components/Navbar";

const Insights = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const MonthLength = [31,28,31,30,31,30,31,31,30,31,30,31];
    const [data] = useRecoilState(dataState);
    console.log(month)
    const monthlyExpenditure = data.filter((item:ResponseType)=>( ((parseInt(item.date.slice(6,8)) === month+1) && 
                                                                   (parseInt(item.date.slice(8,10)) <= day)) ||
                                                                   ((parseInt(item.date.slice(6,8)) === month) &&
                                                                   (parseInt(item.date.slice(8,10)) >= day))) )
    console.log(monthlyExpenditure)
    let tempMonth = month + 1
    let tempDay = day
    const LineChartData:any = {}
    while(tempMonth>=month || (tempMonth === month && day >= tempDay)){
        let tempSpend = 0;
        data.forEach((item:ResponseType)=>{
            if((parseInt(item.date.slice(8,10)) === tempDay) && 
               (parseInt(item.date.slice(6,8)) === tempMonth) &&
                item.money<0 ){
                tempSpend += item.money
            }
        })
        LineChartData[`${tempDay}`] = tempSpend
        if(tempDay === 1){
            tempDay = MonthLength[tempMonth-1]
            tempMonth--;
        }else{
            tempDay--;
        }
    }
    console.log(LineChartData)
  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
        <Navbar />
    </div>
  )
}

export default Insights