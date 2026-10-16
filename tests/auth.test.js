const { test } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
process.env.JWT_SECRET = 'test-only-secret';
function run(authorization) {
    const req = { headers: { authorization } };
    let status, body, next = false;
    const res = { status(code) { status = code; return this; }, json(value) { body = value; return this; } };
    auth(req, res, () => { next = true; });
    return { status, body, next, req };
}
test('missing, malformed, forged, and expired tokens stop protected requests', () => {
    const expired = jwt.sign({ id: 'user' }, process.env.JWT_SECRET, { expiresIn: -1 });
    for (const token of [undefined, 'Bearer', 'Bearer bad', `Bearer ${expired}`]) {
        const result = run(token);
        assert.equal(result.status, 401);
        assert.equal(result.next, false);
    }
});
test('verified token identifies the current user', () => {
    const result = run(`Bearer ${jwt.sign({ id: 'user-123' }, process.env.JWT_SECRET)}`);
    assert.equal(result.next, true);
    assert.equal(result.req.user.id, 'user-123');
});
test('every seeded product has an image and a valid price', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const items = require('../itemData');
    assert.equal(items.length, 50);
    for (const item of items) {
        assert.ok(Number(item.price) > 0, item.name);
        assert.ok(fs.existsSync(path.join(__dirname, '../client/public/assets', item.imgPath)), item.imgPath);
    }
});
