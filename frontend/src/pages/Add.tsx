import { useState } from "react"
import Navbar from "../components/Navbar"
import { labelType } from "../types"

const Add = () => {
  const [formData,setFormData]  = useState({
    title: '',
    money: ''
  })
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#09090B] text-white">
    <Navbar />
    <div className="min-h-screen flex justify-center items-center font-Madami ">
      <div className="border rounded-md p-6">
        <div className="w-[70%] text-center mx-auto">
        <h1 className="text-xl ">Add Expenses/Earnings</h1>
        <p className=" font-extralight font-mono text-gray-300">Add all your expenses to maintain budget and check expenses</p>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <SmallLabeledInput type="text" placeholder="salary" id="Title" onChange={(e)=>{setFormData({...formData,title: e.target.value})}}  />
          <label>
            <h1 className="text-lg ">Spend/Earn</h1>
            <select name="" id="" className="w-full border h-8 rounded-md text-black">
            <option value="">Select</option>
            <option value="spend">Spend</option>
            <option value="earn">Earn</option>
          </select>
          </label>
          <SmallLabeledInput type="number" placeholder="10000" id="Money" onChange={(e)=>{setFormData({...formData,money: e.target.value})}}  />
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
      className="w-full h-8 rounded-md border px-4"
       type={type} placeholder={placeholder} id={id} onChange={onChange} />
    </label>
  )
}
export default Add