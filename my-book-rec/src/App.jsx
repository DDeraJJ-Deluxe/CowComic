import {Route, Routes} from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
