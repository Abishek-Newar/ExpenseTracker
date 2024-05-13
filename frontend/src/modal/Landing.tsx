import { useRecoilState } from "recoil"
import { pageState } from "../config"
import Home from "../pages/Home"
import Add from "../pages/Add"
import Visualize from "../pages/Visualize"

const Landing = () => {
    const [page] = useRecoilState(pageState)
    if(page === 'home') return <Home />
    if(page === 'add') return <Add />
    if(page ==='visualize') return <Visualize /> 
  return (
    <div>LAnding</div>
  )
}

export default Landing