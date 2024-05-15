import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { ResponseType } from "../types"
import { useRecoilState } from "recoil"
import { dataState } from "../config"

const Home = () => {
  const [transactions,setTransactions] = useState([])
  const [data,setData] = useRecoilState(dataState)
  const date: Date = new Date();
  const  month:number = date.getMonth();
  var months:string[]= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  useEffect(()=>{
    async function serverCall(){
      const response = await axios("http://localhost:3000/expense/getexpense",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setTransactions(response.data.expenses)
      setData(response.data.expenses)
    }
    serverCall()
  },[])
  let total = 0;
  transactions.forEach((item:ResponseType)=>{
    if(parseInt(item.date.slice(6,8)) === month+1){
      total += item.money
    }
  })
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#09090B] text-white">
    <Navbar />
    <div className="mt-[17vh]"></div>
    <h1 className="text-5xl font-teko">Transactions</h1>
    <h2 className="font-teko text-3xl" >{months[month]} : <span className={`${total > 0 ? "text-green-500": "text-red-500"}`}>{total}</span> </h2>
    <div>
      <table className="table-fixed">
        <thead >
          <th className="w-[100px]">S no.</th>
          <th className="w-[200px]">Date</th>
          <th className="w-[200px]">Transaction</th>
          <th className="w-[200px]">Amount</th>
        </thead>
        <tbody>
          {
            transactions.map((item : ResponseType,index: number)=>(
              <tr className="text-center" key={index}>
                <td >{index+1}</td>
                <td>{item.date.slice(0,10)}</td>
                <td>
                  {item.title}
                </td>
                <td className={`${item.money > 0 ? "text-green-500": "text-red-500"}`}>
                  {item.money}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    </div>
    
  )
}

export default Home