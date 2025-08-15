import Product from '../models/Product.js';
export const listProducts = async (req, res) => {
  const { q, category } = req.query; const filter = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  res.json(await Product.find(filter).sort({ createdAt: -1 }));
};
export const getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};
export const createProduct = async (req, res) => res.status(201).json(await Product.create(req.body));
export const updateProduct = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};
export const deleteProduct = async (req, res) => {
  const p = await Product.findByIdAndDelete(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};