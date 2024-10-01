const joiSchemas = require('../validations/tag.schemas');
const TagService = require('../services/tag.service');

exports.tag_post = async (req, res) => {
  try {
    const result = await joiSchemas.tag_post.validateAsync(req.body);
    console.log(' ===>result', result);
    const newTag = await TagService.createTag(result.name);
    return res.success(newTag);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.tags_get = async (req, res) => {
  try {
    const tags = await TagService.getAllTags();
    return res.success(tags);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.single_tag_get = async (req, res) => {
  try {
    const tag = await TagService.getTagById(req.params.id);
    if (!tag) return res.fail('Tag not Found');
    return res.success(tag);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.tag_put = async (req, res) => {
  try {
    const result = await joiSchemas.tag_put.validateAsync(req.body);
    const tagId = req.params.id;
    const updatedTag = await TagService.updateTag(tagId, result.name);
    if (!updatedTag) return res.fail('Tag not found');
    return res.success(updatedTag);
  } catch (error) {
    return res.serverError(error);
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const deletedTag = await TagService.deleteTag(req.params.id);
    if (!deletedTag) return res.fail('Tg not Found');
    return res.success('Tag Deleted Successfully');
  } catch (error) {
    return res.serverError(error);
  }
};
