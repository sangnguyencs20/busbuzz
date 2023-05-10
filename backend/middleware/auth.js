require('dotenv').config()
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401).json({
            message: 'Invalid token'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded)
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(403);
    }
}

module.exports = verifyToken;