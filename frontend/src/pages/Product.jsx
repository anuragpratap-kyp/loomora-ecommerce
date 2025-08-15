import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api.js'
export default function Product(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [qty, setQty] = useState(1)
  useEffect(()=>{ api.get(`/products/${id}`).then(res=> setP(res.data)) }, [id])
  if(!p) return <p>Loading...</p>
  const addToCart = ()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    const idx = cart.findIndex(i=> i.product._id === p._id)
    if(idx>-1){ cart[idx].qty += qty } else { cart.push({ product: p, qty }) }
    localStorage.setItem('cart', JSON.stringify(cart)); alert('Added to cart')
  }
  return (<div className="product">
    <img src={p.image || 'https://via.placeholder.com/600x400?text=Product'} alt={p.title} />
    <div><h2>{p.title}</h2><p className="muted">Brand: {p.brand} | Category: {p.category}</p>
      <p>{p.description}</p><h3>₹{p.price}</h3>
      <div className="row"><input type="number" min="1" value={qty} onChange={e=> setQty(parseInt(e.target.value)||1)} />
        <button className="btn" onClick={addToCart}>Add to Cart</button></div></div></div>)
}