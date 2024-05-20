import { useState } from "react"
import Navbar from "../components/Navbar"
import { labelType } from "../types"
import axios from "axios"
import { toast } from "sonner"
import { useRecoilState } from "recoil"
import { pageState } from "../config"

const Add = () => {
  const [page,setPage] = useRecoilState(pageState)
  const [formData,setFormData]  = useState({
    title: '',
    money: ''
  })
  const [expenditureDate,setExpenditureDate] = useState("")
  const [moneyType,setMoneyType]  = useState("")
  async function handleClick(){
    let money: number = parseInt(formData.money)
    if(moneyType === 'spend'){
      money = -money
    }
    let title:string = formData.title
    try {
      await axios.post("http://localhost:3000/expense/add",{title,money,expenditureDate},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast.success("Money Added")
      setTimeout(() => {
        setPage("home")
      }, 2000);
    } catch (error) {
     toast.error("Unable to add Money") 
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#09090B] text-white">
    <Navbar />
    <div className="min-h-screen flex justify-center items-center font-Madami ">
      <div className="border rounded-md p-6">
        <div className="w-[70%] text-center mx-auto flex flex-col gap-3">
        <h1 className="text-2xl ">Add Expenses/Earnings</h1>
        <p className=" font-extralight font-mono text-sm text-gray-300">Add all your expenses to maintain budget and check expenses</p>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <SmallLabeledInput type="text" placeholder="salary" id="Title" onChange={(e)=>{setFormData({...formData,title: e.target.value})}}  />
          <label>
            <h1 className="text-lg " >Spend/Earn</h1>
            <select name="" id="" className="w-full border h-8 rounded-md text-black" onChange={(e)=>setMoneyType(e.target.value)}>
            <option value="">Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
          </label>
          <SmallLabeledInput type="date" placeholder="25-01-2024" id="Expenditure Date" onChange={(e)=>{setExpenditureDate(e.target.value)}} />
          <SmallLabeledInput type="number" placeholder="10000" id="Money" onChange={(e)=>{setFormData({...formData,money: e.target.value})}}  />
          <button onClick={handleClick} className="w-full h-10 bg-white/85 hover:bg-white transition-all ease-linear duration-300 text-black rounded-md">Add Expense</button>
        </div>
      </div>
    </div>
    </div>
  )
}

function SmallLabeledInput({type,placeholder,id,onChange}:labelType){
  return(
    <label htmlFor={id}>
      <h1 className="text-lg font-semibold">{id}</h1>
      <input
      className="w-full h-8 rounded-md border px-4 text-black"
       type={type} placeholder={placeholder} id={id} onChange={onChange} required />
    </label>
  )
}
export default Add