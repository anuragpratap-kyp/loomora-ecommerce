import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
export default function Navbar() {
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); nav('/') }
  return (<header className="nav"><div className="nav-left">
    <Link to="/" className="brand"><img src={logo} alt="Loomora" height="28" /><span>LOOMORA</span></Link></div>
    <div className="nav-center"><input placeholder="Search products..." id="searchBox" onKeyDown={(e)=>{
      if(e.key==='Enter'){ window.location.href='/?q='+encodeURIComponent(e.target.value) }}}/></div>
    <nav className="nav-right"><Link to="/cart">Cart</Link>{token ? <button onClick={logout}>Logout</button> : <><Link to="/login">Login</Link><Link to="/signup">Signup</Link></>}
    </nav></header>)
}