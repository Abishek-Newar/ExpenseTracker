import { useRecoilState } from "recoil"
import { pageState } from "../config"
import Home from "../pages/Home"
import Add from "../pages/Add"
import Visualize from "../pages/Visualize"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Insights from "../pages/Insights"

const Landing = () => {
  const navigate = useNavigate()
    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate("/")
      }
    })
    const [page] = useRecoilState(pageState)
    if(page === 'home') return <Home />
    if(page === 'add') return <Add />
    if(page ==='visualize') return <Visualize /> 
    if(page === 'insights') return <Insights />
  return (
    <div>LAnding</div>
  )
}

export default Landing