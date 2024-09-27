const joiSchemas = require('../validations/auth.schemas');
const UserService = require('../services/user.service');
const crypto = require('crypto');
const mailer = require('../config/mailer');

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
    return res.serverError(error);
  }
};

module.exports.local_login_post = async (req, res) => {
  try {
    const results = await joiSchemas.local_login_post.validateAsync(req.body);
    let foundUser = await UserService.readByEmail(results.email);
    if (!foundUser) return res.fail('User with this email is not SignUp yet');

    isPasswordValid = await foundUser.isValidPassword(results.password);
    if (!isPasswordValid) return res.fail('Incorrect Password');
    return res.success(generateToken(foundUser));
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.me_get = async (req, res) => {
  try {
    res.success(req.user);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.change_password_post = async (req, res) => {
  try {
    const results = await joiSchemas.change_password_post.validateAsync(req.body);
    isPasswordValid = await UserService.validatePassword(req.user._id, results.currentPassword);
    if (!isPasswordValid) return res.fail('Incorrect Current Password');
    await UserService.updatePassword(req.user._id, results.newPassword);
    return res.success('Password changed successfully');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.forgot_password_post = async (req, res) => {
  try {
    const results = await joiSchemas.forgot_password_post.validateAsync(req.body);
    let user = await UserService.readByEmail(results.email);
    if (!user) return res.fail('User with this email is not SignUp yet');
    const forgotPasswordCode = crypto.randomInt(100000, 999999);
    const passwordResetCodeExpiry = Date.now() + 3600000;
    console.log('user id ===>' + user._id);

    await UserService.updateForgotPasswordCode(user._id, { passwordResetCodeExpiry, forgotPasswordCode });
    await mailer.sendMail({
      to: results.email,
      subject: 'Pinterest Password Reset Code',
      text: `Your password reset code is: ${forgotPasswordCode}`,
    });

    return res.success('Reset code sent to your email.');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.reset_password_post = async (req, res) => {
  try {
    const results = await joiSchemas.reset_password_post.validateAsync(req.body);
    let user = await UserService.readByEmail(results.email);
    if (!user) return res.fail('User with this email is not SignUp yet');
    if (user.forgotPasswordCode !== Number(results.forgotPasswordCode) || Date.now() > user.passwordResetCodeExpiry) {
      return res.fail('Invalid or expired reset code.');
    }
    await UserService.updatePassword(user._id, results.newPassword);
    return res.success('Password has been updated');
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.all_users_get = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.success(users);
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.single_user_get = async (req, res) => {
  try {
    const results = await joiSchemas.single_user_get.validateAsync(req.params);
    const user = await UserService.getUserById(results.id);
    if (!user) return res.fail('User not found');

    return res.success({ user });
  } catch (error) {
    return res.serverError(error);
  }
};

module.exports.single_user_delete = async (req, res) => {
  try {
    const results = await joiSchemas.single_user_delete.validateAsync(req.params);
    await UserService.deleteUser(results.id);
    return res.success('User deleted successfully');
  } catch (error) {
    return res.serverError(error);
  }
};
