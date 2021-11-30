const jwt = require('jsonwebtoken');

const secret = 'secreto';

const validateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return ({ code: 401, error: { message: 'jwt malformed' } });
    
    try {
        const decoded = jwt.verify(token, secret);

        req.user = decoded.data;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = validateJWT;
