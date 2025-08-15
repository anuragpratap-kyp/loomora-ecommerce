import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, qty: { type: Number, required: true } }],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true });
export default mongoose.model('Order', orderSchema);