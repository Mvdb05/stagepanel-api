const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware voor autorisatie
const authorize = (req, res, next) => {
  // Controleer of er een autorisatietoken aanwezig is in de headers
  const token = req.header('Authorization');

  // Als er geen token aanwezig is, ga verder zonder autorisatie
  if (!token) {
    return next();
  }

  try {
    // Verifieer en decodeer het token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Ongeldig autorisatietoken' });
  }
};

module.exports = authorize;
