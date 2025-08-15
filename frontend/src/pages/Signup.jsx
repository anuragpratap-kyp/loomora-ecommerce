import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api.js'
export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault()
    try{ const res = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('token', res.data.token); localStorage.setItem('user', JSON.stringify(res.data.user)); nav('/') }
    catch(e){ alert(e?.response?.data?.message || 'Signup failed') }
  }
  return (<form onSubmit={submit} className="card form"><h2>Signup</h2>
    <input placeholder="Name" value={name} onChange={e=> setName(e.target.value)} required />
    <input placeholder="Email" type="email" value={email} onChange={e=> setEmail(e.target.value)} required />
    <input placeholder="Password" type="password" value={password} onChange={e=> setPassword(e.target.value)} required />
    <button className="btn" type="submit">Create account</button></form>)
}