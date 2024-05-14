import {  useState } from "react"
import {  ButtonType, labelType } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate()
  const [type,setType] = useState("signin");
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  async function Authentication(){
    try {
      const response = await axios.post(`http://localhost:3000/user/${type}`,formData)
      toast('Login Sucessfull')
      localStorage.setItem("token",response.data.token)
      setTimeout(() => {
        navigate("/landing")
      }, 2000);
    } catch (error) {
      alert("Enter Correct Password")
    }
  }
  return (
    <>
    <div className="min-h-screen bg-slate-200  flex items-center justify-center">
      <div className="border border-black w-[450px] flex flex-col  gap-6 p-6 rounded-lg">
        {
          type === 'signin'?
          <h1 className="text-3xl font-bold text-center">SIGN IN</h1>:
          <h1 className="text-3xl font-bold text-center">SIGN UP</h1>
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
          <Button onClick={Authentication}  name="SIGN IN" /> :
          <Button onClick={Authentication} name="SIGN UP" />
        }
        {
          type === 'signin'?
          <p className="text-center select-none">Don't have a Acoount? <span className="underline cursor-pointer select-none " onClick={()=>setType("signup")}>Sign up</span></p>:
          <p className="text-center select-none">Already have a Acoount? <span className="underline cursor-pointer select-none " onClick={()=>setType("signin")}>Sign in</span></p>
        }
      </div>
    </div>
    </>
  )
}

function LabeledInput({type,placeholder,id,onChange}:labelType){
  return(
    <label htmlFor={id}>
      <h1 className="text-lg font-semibold">{id}</h1>
      <input
      className="w-full h-12 rounded-lg border px-4"
       type={type} placeholder={placeholder} id={id} onChange={onChange} required />
       
    </label>
  )
}

function Button({name,onClick}:ButtonType){
  return <>
  <button onClick={onClick} className="h-12 bg-black text-white rounded-lg font-bold text-xl">{name}</button>
  </>
}
export default Auth