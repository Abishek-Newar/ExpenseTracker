import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ButtonType, labelType } from "../types";

const Auth = () => {
  const navigate = useNavigate()
  const [type,setType] = useState("signin");
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  async function Authentication(e:any){
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:3000/user/${type}`,formData)
      toast.success(`${type} Sucessfull`)
      localStorage.setItem("token",response.data.token)
      setTimeout(() => {
        navigate("/landing")
      }, 2000);
    } catch (error) {
      toast.error("Enter Correct Password")
    }
  }
  return (
    <>
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
      <form className="border  w-[450px] flex flex-col  gap-6 p-6 rounded-lg  font-Madami " >
        {
          type === 'signin'?
          <h1 className="text-3xl font-bold  text-center text-white">SIGN IN</h1>:
          <h1 className="text-3xl font-bold text-center text-white">SIGN UP</h1>
        }
        {
          type === 'signup'?
          <LabeledInput type="text" placeholder="John Doe" id="Name" onChange={(e)=>{setFormData({...formData,name: e.target.value})}} />:
          null
        }
        <LabeledInput type="email" placeholder="johnDoe@gmail.com" id="Email" onChange={(e)=>{setFormData({...formData,email: e.target.value})}} />
        <LabeledInput type="password" placeholder="******" id="Password" onChange={(e)=>{setFormData({...formData,password: e.target.value})}} />
        {
          type === 'signin'?
          <Button onClick={(e)=>{Authentication(e)}}  name="SIGN IN" /> :
          <Button onClick={(e)=>{Authentication(e)}} name="SIGN UP" />
        }
        {
          type === 'signin'?
          <p className="text-center select-none text-white">Don't have a Acoount? <span className="underline cursor-pointer select-none " onClick={()=>setType("signup")}>Sign up</span></p>:
          <p className="text-center select-none text-white">Already have a Acoount? <span className="underline cursor-pointer select-none " onClick={()=>setType("signin")}>Sign in</span></p>
        }
      </form>
    </div>
    </>
  )
}

function LabeledInput({type,placeholder,id,onChange}:labelType){
  return(
    <label htmlFor={id}>
      <h1 className="text-lg font-semibold text-white">{id}</h1>
      <input
      className="w-full h-9 rounded-lg border px-4"
       type={type} placeholder={placeholder} id={id} onChange={onChange} required={true} />
       
    </label>
  )
}

function Button({name,onClick}:ButtonType){
  return <>
  <button  onClick={onClick} type="submit" className="h-10 bg-white text-black rounded-lg font-bold text-xl">{name}</button>
  </>
}
export default Auth