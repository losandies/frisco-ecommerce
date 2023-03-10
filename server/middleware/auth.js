const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res
            .status(403)
            .json({ error: "A Token is required of authentication" });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;
