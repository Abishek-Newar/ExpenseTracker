import { useRecoilState } from "recoil"
import { pageState } from "../config"

const LAnding = () => {
    const [page] = useRecoilState(pageState)
    if(page === 'home') return 
  return (
    <div>LAnding</div>
  )
}

export default LAnding