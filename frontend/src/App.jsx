import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Layout from "./components/global/Layout"
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup"
import Categories from "./pages/Categories"



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories/:categoryName" element={<Layout><Categories /></Layout> } />
        {/* <Route path="/" element={< Home />} /> */}
      </Routes>
    </Router>
  )
}

export default App
