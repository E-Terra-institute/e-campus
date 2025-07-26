// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Токен не надано' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'секретний_ключ');
    req.user = decoded; // Додаємо користувача в запит
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Недійсний токен' });
  }
};
