const FollowService = require('../services/follow.service');
const joiSchemas = require('../validations/follow.schemas');

exports.follow_user_post = async (req, res) => {
  const userId = req.params.userId; // ID of the user being followed
  const followerId = req.user._id; // ID of the current authenticated user (follower)
  try {
    const followData = await FollowService.followUser(userId, followerId);
    return res.success(followData);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.unfollow_user_post = async (req, res) => {
  const userId = req.params.userId; // ID of the user being unfollowed
  const followerId = req.user._id; // ID of the current authenticated user (follower)

  try {
    const user = await FollowService.unfollowUser(userId, followerId);
    if (!user) return res.fail('Pin not found');
    return res.success('Unfollowed Successfully');
  } catch (error) {
    console.error('Error in unfollow_user_post:', error);
    return res.serverError(error);
  }
};

exports.followers_get = async (req, res) => {
  const { userId } = req.params;

  try {
    const followers = await FollowService.getFollowers(userId);
    return res.success(followers);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.following_get = async (req, res) => {
  const { userId } = req.params;

  try {
    const following = await FollowService.getFollowing(userId);
    return res.success(following);
  } catch (error) {
    return res.serverError(error);
  }
};
