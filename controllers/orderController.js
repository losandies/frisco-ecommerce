const prisma = require('../lib/prisma');
const createOrder = async (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items) || !items.length || items.length > 100 || items.some(item => !item || !Number.isInteger(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || !['string', 'number'].includes(typeof item.size) || !String(item.size).trim() || String(item.size).length > 20)) {
        return res.status(400).json({ error: 'Choose products, sizes, and valid quantities' });
    }
    const products = await prisma.item.findMany({ where: { id: { in: items.map(item => item.id) } } });
    const catalog = new Map(products.map(item => [item.id, item]));
    if (items.some(item => !catalog.has(item.id))) return res.status(400).json({ error: 'A product is no longer available' });
    const orderItems = items.map(({ id, quantity, size }) => ({ ...catalog.get(id), createdAt: undefined, quantity, size }));
    const cents = orderItems.reduce((sum, item) => sum + Math.round(Number(item.price) * 100) * item.quantity, 0);
    const order = await prisma.order.create({ data: { userId: req.user.id, items: JSON.parse(JSON.stringify(orderItems)), total: ((cents + 500 + Math.round(cents * 0.06)) / 100).toFixed(2) } });
    return res.status(201).json(order);
};
const getAllOrders = async (req, res) => res.json(await prisma.order.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } }));
module.exports = { createOrder, getAllOrders };
