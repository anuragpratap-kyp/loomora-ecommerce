import { useEffect, useState } from 'react'
import api from '../utils/api.js'
export default function Cart(){
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState('')
  const token = localStorage.getItem('token')
  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem('cart')||'[]')) }, [])
  const total = cart.reduce((s, i)=> s + i.product.price * i.qty, 0)
  const checkout = async ()=>{
    if(!token) return alert('Please login to checkout')
    if(!address) return alert('Enter address')
    const payload = { items: cart.map(i=> ({ product: i.product._id, qty: i.qty })), total, address }
    await api.post('/orders', payload, { headers: { Authorization: 'Bearer ' + token } })
    alert('Order placed!'); localStorage.removeItem('cart'); setCart([])
  }
  return (<div><h2>Your Cart</h2>{cart.length===0 ? <p>Cart is empty</p> : (<div>
    {cart.map((i,idx)=>(<div key={idx} className="cart-item"><span>{i.product.title} x {i.qty}</span><span>₹{i.product.price * i.qty}</span></div>))}
    <h3>Total: ₹{total}</h3><textarea placeholder="Delivery address" value={address} onChange={e=> setAddress(e.target.value)} />
    <button className="btn" onClick={checkout}>Checkout</button></div>)}</div>)
}