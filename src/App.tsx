import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home.tsx";
import Fridge from "./components/fridge/index.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fridge/:fridgeId" element={<Fridge />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App