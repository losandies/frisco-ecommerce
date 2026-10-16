require('./lib/env');
const express = require('express');
const path = require('path');
const prisma = require('./lib/prisma');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));
app.get('/api/health', require('./lib/asyncHandler')(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
}));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found' }));
if (['production', 'staging'].includes(process.env.NODE_ENV)) {
    app.use(express.static(path.join(__dirname, 'client/dist')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client/dist/index.html')));
}
app.use((error, req, res, next) => {
    console.error(error.message);
    const status = error.code === 'P2002' ? 409 : error.status || 500;
    res.status(status).json({ error: status === 409 ? 'This account already exists' : status < 500 ? 'Invalid request' : 'Unable to complete request. Please try again' });
});
if (require.main === module) {
    if (!process.env.DATABASE_URL || !(process.env.JWT_SECRET || process.env.jwtSecret)) {
        console.error('Missing DATABASE_URL or JWT_SECRET. See README.md for setup.');
        process.exit(1);
    }
    app.listen(process.env.PORT || 5001, () => console.log(`Frisco running at http://localhost:${process.env.PORT || 5001}`));
}
module.exports = app;
