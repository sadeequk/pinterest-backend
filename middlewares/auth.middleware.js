// const jwt = require('jsonwebtoken');

// module.exports.ensureAuthenticated = async (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.fail('Unauthorized');

//   const user = await jwt.decode(authHeader.replace(/Bearer/gi, '').trim());
//   if (!user) return res.fail('Unauthorized');

//   req.user = { _id: user.id };
//   return next();
// };

const jwt = require('jsonwebtoken');
module.exports.ensureAuthenticated = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id: user.id };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
