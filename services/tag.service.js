const Tag = require('../models/tag.model');

exports.createTag = (name) =>
  new Promise(async (resolve, reject) => {
    try {
      const tag = new Tag({ name });
      await tag.save();
      return resolve(tag);
    } catch (error) {
      console.log('Tag Service [createTag] Error:', error);
      return reject(error);
    }
  });

exports.getAllTags = () =>
  new Promise(async (resolve, reject) => {
    try {
      const tags = await Tag.find();
      return resolve(tags);
    } catch (error) {
      console.log('Tag Service [getAllTags] Error:', error);
      return reject(error);
    }
  });

exports.getTagById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const tag = await Tag.findById(id).populate('pins');
      if (!tag) return reject(new Error('Tag not found'));
      return resolve(tag);
    } catch (error) {
      console.log('Tag Service [getTagById] Error:', error);
      return reject(error);
    }
  });

exports.updateTag = (id, name) =>
  new Promise(async (resolve, reject) => {
    try {
      const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
      if (!updatedTag) return reject(new Error('Tag not found'));
      return resolve(updatedTag);
    } catch (error) {
      console.log('Tag Service [updateTag] Error:', error);
      return reject(error);
    }
  });

exports.deleteTag = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const deletedTag = await Tag.findByIdAndDelete(id);
      if (!deletedTag) return reject(new Error('Tag not found'));
      return resolve(deletedTag);
    } catch (error) {
      console.log('Tag Service [deleteTag] Error:', error);
      return reject(error);
    }
  });
