import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import LAnding from "./modal/LAnding"
import { RecoilRoot } from "recoil"

function App() {
  

  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/landing" element={<LAnding />} />
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
