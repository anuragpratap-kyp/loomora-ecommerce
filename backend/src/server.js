import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
const app = express();
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: clientURL, credentials: true }));
app.get('/', (req, res) => res.send({ ok: true, service: 'Loomora API' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/loomora')
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch(console.error);