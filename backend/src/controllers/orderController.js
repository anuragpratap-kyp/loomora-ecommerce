import Order from '../models/Order.js';
export const createOrder = async (req, res) => {
  const { items, total, address } = req.body;
  const order = await Order.create({ user: req.user.id, items, total, address });
  res.status(201).json(order);
};
export const myOrders = async (req, res) => res.json(await Order.find({ user: req.user.id }).populate('items.product'));