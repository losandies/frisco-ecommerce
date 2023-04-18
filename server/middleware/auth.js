const jwt = require("jsonwebtoken");
require("dotenv").config();

// const verifyToken = (req, res, next) => {
//     const token =
//         req.body.token ||
//         req.query.token ||
//         (req.headers.authorization &&
//             req.headers.authorization.startsWith("Bearer"));

//     console.log(token);

//     if (!token) {
//         return res
//             .status(403)
//             .json({ error: "A Token is required of authentication" });
//     }

//     try {
//         console.log("object");
//         const decoded = jwt.verify(token, config.jwtSecret);
//         // req.user = decoded;
//         console.log(decoded);
//     } catch (err) {
//         return res.status(401).json({ error: "Invalid Token" });
//     }
//     return next();
// };

// module.exports = verifyToken;

module.exports = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) res.status(403).json({ error: "Not Authorized" });

            const payload = jwt.verify(token, process.env.jwtSecret);

            req.user = payload;
        } catch (err) {
            res.status(403).json(false);
        }
    }
    next();
};
