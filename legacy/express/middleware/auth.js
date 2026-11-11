const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const match = /^Bearer (\S+)$/.exec(req.headers.authorization || '');
    if (!match) return res.status(401).json({ error: 'Please log in' });
    try {
        req.user = jwt.verify(match[1], process.env.JWT_SECRET || process.env.jwtSecret);
        return next();
    } catch {
        return res.status(401).json({ error: 'Session expired. Please log in again' });
    }
};
