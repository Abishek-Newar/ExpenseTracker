import { BrowserRouter, Route, Routes } from "react-router-dom"

import { RecoilRoot } from "recoil"
import Landing from "./modal/Landing"
import Auth from "./pages/Auth"

function App() {
  

  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/landing" element={<Landing />} />
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
