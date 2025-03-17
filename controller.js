const Post = require("./models/Post.model");
const Tag = require("./models/Tag.model");

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    const tags = req.body.tags;
    await Promise.all(
      tags.map(async (tag) => {
        const foundTag = await Tag.findOne({ name: tag });
        if (foundTag) {
          foundTag.posts.push(post._id);
          await foundTag.save();
        } else {
          const newTag = await Tag.create({ name: tag, posts: [post._id] });
          post.tags.push(newTag._id);
          await post.save();
        }
      })
    );
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
};
