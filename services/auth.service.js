const User = require('../models/user.model');

module.exports.readByEmail = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      return resolve(user);
    } catch (error) {
      console.log('Collection Service [readByEmail] Error: ', error);
      return reject(error);
    }
  });

module.exports.addUserBasic = ({ email, password, username }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newUser = new User({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });

      await newUser.save();
      console.log(`User Service: Created Local User with id ==> ${newUser._id}`);
      return resolve(newUser);
    } catch (error) {
      console.log('User Service [addUserBasic] Error', error);
      return reject(error);
    }
  });
module.exports.readById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id).select('-password');

      return resolve(user);
    } catch (error) {
      console.log('UserService readById Error: ', error);
      return reject(error);
    }
  });
