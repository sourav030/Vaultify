const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        const secretKey = process.env.JWT_SECRET || 'yemerasecretkeyhai'; // use env in production

        const decoded = jwt.verify(token, secretKey);

        // Add user info to request object if needed
        req.user = decoded;

        next(); // proceed to next middleware/controller
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports=authentication