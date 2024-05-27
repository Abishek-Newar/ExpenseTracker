import { useRecoilState } from "recoil"
import { pageState } from "../config"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const [page,setPage] = useRecoilState(pageState)
    const navigate = useNavigate()
  return (
    <nav className="h-[9vh] fixed w-[90%] mx-auto rounded-lg  flex justify-between items-center px-10 mt-10 border text-white">
        <div className="text-2xl font-chill font-bold">
            Expense
        </div>
        <div>
            <ul className="flex items-center gap-6 uppercase font-Madami ">
                <li className={`${page === 'home'? " underline decoration-4 underline-offset-8 " : "" } cursor-pointer`} onClick={()=>{setPage('home')}}>Home</li>
                <li className={`${page === 'visualize'? " underline decoration-4 underline-offset-8 " : "" } cursor-pointer`} onClick={()=>{setPage('visualize')}}>Visualize</li>
                <li className={`${page === 'add'? " underline decoration-4 underline-offset-8 " : "" } cursor-pointer`} onClick={()=>{setPage('add')}}>Add</li>
                <li className={`${page === 'insights'? " underline decoration-4 underline-offset-8 " : "" } cursor-pointer`} onClick={()=>{setPage('insights')}}>Insights</li>
            </ul>
        </div>
        <div>
            <button onClick={()=>{localStorage.clear();navigate("/")}} className="h-10 w-20 rounded-md border">Log Out</button>
        </div>
    </nav>
  )
}

export default Navbar