const Follow = require('../models/follow.model');
const User = require('../models/user.model');

exports.followUser = (userId, followerId) =>
  new Promise(async (resolve, reject) => {
    try {
      if (userId === followerId) {
        return reject(new Error("You can't follow yourself."));
      }

      const existingFollow = await Follow.findOne({ user: userId, follower: followerId });
      if (existingFollow) {
        return reject(new Error('You are already following this user.'));
      }

      const followData = await Follow.create({ user: userId, follower: followerId });
      return resolve(followData);
    } catch (error) {
      console.log('Follower Service [followUser] Error: ', error);
      return reject(error);
    }
  });

exports.unfollowUser = (userId, followerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const existingFollow = await Follow.findOne({ user: userId, follower: followerId });
      if (!existingFollow) {
        return reject(new Error('You are not following this user.'));
      }

      const unfollowData = await Follow.findOneAndDelete({ user: userId, follower: followerId });
      if (!unfollowData) {
        return reject(new Error('Failed to unfollow the user.'));
      }

      return resolve(unfollowData);
    } catch (error) {
      console.log('Follower Service [unfollowUser] Error: ', error);
      return reject(error);
    }
  });

exports.getFollowers = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const followers = await Follow.find({ user: userId }).populate('follower', 'username avatarUrl');
      return resolve(followers);
    } catch (error) {
      console.log('Follower Service [getFollowers] Error: ', error);
      return reject(error);
    }
  });

exports.getFollowing = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const following = await Follow.find({ follower: userId }).populate('user', 'username avatarUrl');
      return resolve(following);
    } catch (error) {
      console.log('Follower Service [getFollowing] Error: ', error);
      return reject(error);
    }
  });
