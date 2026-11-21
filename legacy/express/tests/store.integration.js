// Run against a seeded development database. Only test-created accounts are removed.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { randomUUID } = require('node:crypto');
const app = require('../server');
const prisma = require('../lib/prisma');
test('catalog → registration → address → checkout → private order history', async () => {
    const server = app.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const base = `http://127.0.0.1:${server.address().port}`;
    const accounts = [];
    const emails = [0, 1].map(() => `test-${randomUUID()}@example.test`);
    async function request(route, { token, body, method = body ? 'POST' : 'GET' } = {}) {
        const res = await fetch(base + '/api/' + route, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
        return { status: res.status, body: await res.json() };
    }
    try {
        assert.equal((await request('health')).status, 200);
        const catalog = await request('items/getItems');
        assert.equal(catalog.status, 200);
        assert.ok(catalog.body.length >= 50);
        assert.equal((await request('users/getCurrentUser')).status, 401);
        assert.equal((await request('orders/placeOrder', { body: { items: [] } })).status, 401);
        assert.equal((await request('users/register', { body: { firstName: 'Missing' } })).status, 400);
        assert.equal((await request('users/login', { body: { email: emails[0], password: 'wrong-password' } })).status, 401);
        for (const email of emails) {
            const result = await request('users/register', { body: { firstName: 'Test', lastName: 'Shopper', email: email.toUpperCase(), password: 'test-password-123' } });
            assert.equal(result.status, 201);
            accounts.push(result.body);
            assert.equal(result.body.email, email);
            assert.equal('password' in result.body, false);
            assert.equal(result.body.address, null);
        }
        const token = accounts[0].token;
        assert.equal((await request('users/register', { body: { firstName: 'Test', lastName: 'Duplicate', email: emails[0], password: 'test-password-123' } })).status, 409);
        const login = await request('users/login', { body: { email: emails[0].toUpperCase(), password: 'test-password-123' } });
        assert.equal(login.status, 200);
        assert.equal('password' in login.body, false);
        assert.equal((await request('users/updateAddress', { token, body: { street: '123 Demo Street' } })).status, 400);
        assert.equal((await request('users/updateAddress', { token, body: { street: '123 Demo Street', city: 'New York', zip: '10001', state: 'NY' } })).status, 200);
        const item = catalog.body[0];
        for (const items of [[], [{ id: item.id, quantity: -1, size: 'md' }], [{ id: 2147483647, quantity: 1, size: 'md' }]]) {
            assert.equal((await request('orders/placeOrder', { token, body: { items } })).status, 400);
        }
        const order = await request('orders/placeOrder', { token, body: { user: accounts[1], total: '0.01', items: [{ id: item.id, quantity: 2, size: 'md', price: '0.01', name: 'Forged' }] } });
        assert.equal(order.status, 201);
        assert.equal(order.body.userId, accounts[0].id);
        const subtotalCents = Math.round(Number(item.price) * 100) * 2;
        assert.equal(order.body.total, ((subtotalCents + 500 + Math.round(subtotalCents * 0.06)) / 100).toFixed(2));
        assert.equal(order.body.items[0].name, item.name);
        const me = await request('users/getCurrentUser', { token });
        assert.equal(me.body.address.city, 'New York');
        assert.equal(me.body.orders.length, 1);
        assert.equal('password' in me.body, false);
        assert.equal((await request('orders/allOrders', { token: accounts[1].token })).body.length, 0);
        assert.equal((await request('users/allUsers')).status, 404);
        assert.equal((await request('users/delete', { method: 'DELETE' })).status, 404);
        assert.equal((await request('items/addItem', { body: {} })).status, 404);
    } finally {
        const users = await prisma.user.findMany({ where: { email: { in: emails } } });
        const ids = users.map(user => user.id);
        await prisma.order.deleteMany({ where: { userId: { in: ids } } });
        await prisma.address.deleteMany({ where: { userId: { in: ids } } });
        await prisma.user.deleteMany({ where: { id: { in: ids } } });
        await new Promise(resolve => server.close(resolve));
        await prisma.$disconnect();
    }
});
