import { useRecoilState } from "recoil"
import { pageState } from "../config"

const Navbar = () => {
    const [page,setPage] = useRecoilState(pageState)
  return (
    <nav className="h-[9vh] fixed w-[90%] mx-auto rounded-lg  flex justify-between items-center px-10 mt-10 border text-white">
        <div className="text-2xl font-chill font-bold">
            Expense
        </div>
        <div>
            <ul className="flex items-center gap-6 uppercase font-Madami ">
                <li className={`${page === 'home'? " underline decoration-4 underline-offset-8 " : "" }`} onClick={()=>{setPage('home')}}>Home</li>
                <li className={`${page === 'visualize'? " underline decoration-4 underline-offset-8 " : "" }`} onClick={()=>{setPage('visualize')}}>Visualize</li>
                <li className={`${page === 'add'? " underline decoration-4 underline-offset-8 " : "" }`} onClick={()=>{setPage('add')}}>Add</li>
            </ul>
        </div>
        <div></div>
    </nav>
  )
}

export default Navbar