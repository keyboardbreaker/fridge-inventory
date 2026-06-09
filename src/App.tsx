import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Fridge from "./components/fridge";
import Header from "./components/header";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fridge/:fridgeId" element={<Fridge />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App