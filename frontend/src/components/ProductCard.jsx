import { Link } from 'react-router-dom'
export default function ProductCard({ p }) {
  return (<Link className="card" to={`/product/${p._id}`}>
    <img src={p.image || 'https://via.placeholder.com/300x200?text=Product'} alt={p.title} />
    <div className="card-body"><h3>{p.title}</h3><p className="muted">₹{p.price}</p></div>
  </Link>)
}