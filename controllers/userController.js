const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const include = { address: true, orders: { orderBy: { createdAt: 'desc' } } };
const serialize = ({ password, ...user }) => ({
    ...user,
    token: jwt.sign({ id: user.id }, process.env.JWT_SECRET || process.env.jwtSecret, { expiresIn: '24h' }),
});
const normalizeEmail = (email) => typeof email === 'string' ? email.trim().toLowerCase() : '';
const registerUser = async (req, res) => {
    const { firstName, lastName, password } = req.body;
    const email = normalizeEmail(req.body.email);
    if (![firstName, lastName, password].every(value => typeof value === 'string' && value.trim()) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Enter a name, valid email, and password' });
    }
    if (password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) return res.status(400).json({ error: 'Password must be at least 8 characters and at most 72 bytes' });
    if (await prisma.user.findFirst({ where: { email } })) return res.status(409).json({ error: 'User already exists. Please log in' });
    const user = await prisma.user.create({ data: { firstName: firstName.trim(), lastName: lastName.trim(), email, password: await bcrypt.hash(password, 10) }, include });
    return res.status(201).json(serialize(user));
};
const loginUser = async (req, res) => {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;
    if (!email || typeof password !== 'string' || !password) return res.status(400).json({ error: 'Email and password are required' });
    const user = await prisma.user.findFirst({ where: { email }, include });
    if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).json({ error: 'Invalid email or password' });
    return res.json(serialize(user));
};
const getCurrentUser = async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id }, include });
    if (!user) return res.status(401).json({ error: 'Please log in again' });
    return res.json(serialize(user));
};
const updateUserAddress = async (req, res) => {
    const { street, city, zip, state } = req.body;
    if (![street, city, zip, state].every(value => typeof value === 'string' && value.trim())) return res.status(400).json({ error: 'All address fields are required' });
    const data = { street: street.trim(), city: city.trim(), zipCode: zip.trim(), state: state.trim() };
    const address = await prisma.address.upsert({ where: { userId: req.user.id }, create: { userId: req.user.id, ...data }, update: data });
    return res.json(address);
};
module.exports = { registerUser, loginUser, getCurrentUser, updateUserAddress };
