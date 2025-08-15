import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, default: 'Generic' },
  category: { type: String, default: 'general' },
  image: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Product', productSchema);