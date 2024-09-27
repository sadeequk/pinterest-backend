const jwt = require('jsonwebtoken');

module.exports.ensureAuthenticated = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.fail('Unauthorized');

  const user = await jwt.decode(authHeader.replace(/Bearer/gi, '').trim());
  if (!user) return res.fail('Unauthorized');

  req.user = { _id: user.id };
  return next();
};
