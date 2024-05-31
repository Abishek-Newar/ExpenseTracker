import { useRecoilState } from "recoil";
import { dataState } from "../config";
import { Maps, ResponseType } from "../types";
import Navbar from "../components/Navbar";
import { LineChart } from "../components/LineChart";


const Insights = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const MonthLength = [31,28,31,30,31,30,31,31,30,31,30,31];
    const [data] = useRecoilState(dataState);
    console.log(month)
    let tempMonth = month + 1
    let tempDay = day
    let LineChartData:Maps = new Map()
    while(tempMonth>=month-1 || (tempMonth === month-1 && day >= tempDay)){
        let tempSpend = 0;
        data.forEach((item:ResponseType)=>{
            if((parseInt(item.date.slice(8,10)) === tempDay) && 
               (parseInt(item.date.slice(6,8)) === tempMonth + 1) &&
                item.money<0 ){
                tempSpend += item.money
            }
        })
        LineChartData.set(tempDay,Math.abs(tempSpend))
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
        <div className="h-auto xl:h-[600px] w-[70%] mx-auto mt-[20vh] border">
        <LineChart LineChartData={LineChartData} />
        </div>
    </div>
  )
}

export default Insights