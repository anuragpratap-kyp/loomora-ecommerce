import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
export default function App() {
  return (<div><Navbar /><main className="container">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes></main></div>)
}