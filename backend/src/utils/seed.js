import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/loomora';
const products = [
  { title: 'Loomora Wireless Headphones', description: 'Bass boosted, 20h battery', price: 1999, brand: 'Loomora', category: 'electronics', image: '/images/headphones.jpg', rating: 4.5, stock: 50 },
  { title: 'Loomora Cotton T-Shirt', description: '100% cotton classic fit', price: 499, brand: 'Loomora', category: 'fashion', image: '/images/tshirt.jpg', rating: 4.2, stock: 150 },
  { title: 'Loomora Smartwatch', description: 'Heart rate, SpO2, 1.4" display', price: 2499, brand: 'Loomora', category: 'electronics', image: '/images/watch.jpg', rating: 4.3, stock: 80 }
];
(async () => {
  await mongoose.connect(MONGO_URI, { dbName: 'loomora' });
  await User.deleteMany({}); await Product.deleteMany({});
  await User.create({ name: 'Admin', email: 'admin@loomora.com', password: await bcrypt.hash('admin123', 10), isAdmin: true });
  await Product.insertMany(products);
  console.log('Seeded admin and products'); process.exit(0);
})();