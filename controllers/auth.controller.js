const joiSchemas = require('../validations/auth.schemas');
const UserService = require('../services/auth.service');
const { generateToken } = require('../helpers/jwt');

module.exports.local_signup_post = async (req, res) => {
  try {
    const results = await joiSchemas.local_signup_post.validateAsync(req.body);
    let foundUser = await UserService.readByEmail(results.email);
    console.log('====> email', results.email);
    if (foundUser) return res.fail('User with this email already exist');

    const newUser = await UserService.addUserBasic({
      email: results.email,
      password: results.password,
      username: results.username,
    });

    return res.success(generateToken(newUser));
  } catch (error) {
    console.error('Error in local_signup_post controller: ', error);
    return res.serverError(error.message);
  }
};
