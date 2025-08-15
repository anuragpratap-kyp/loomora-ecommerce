import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../utils/api.js'
import ProductCard from '../components/ProductCard.jsx'
export default function Home(){
  const [products, setProducts] = useState([])
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  useEffect(()=>{ api.get('/products', { params: { q }}).then(res=> setProducts(res.data)) }, [q])
  return (<div><div className="hero"><h1>Welcome to LOOMORA</h1><p>Shop electronics, fashion & more</p><Link className="btn" to="/">Explore</Link></div>
    <div className="grid">{products.map(p=> <ProductCard key={p._id} p={p} />)}</div></div>)
}