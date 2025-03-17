const Post = require("./models/Post.model");
const Tag = require("./models/Tag.model");

const createPost = async (req, res) => {
  try {
    const { title, desc, tags } = req.body;

    //check if all fields are filled
    //if not, return a 400 status code with a message
    
    if (!title || !desc || !tags || tags.length === 0) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const post = await Post.create({ title, desc });

    //for parellel execution of promises
    //Promise.all() is used to wait for all promises to resolve and then return the result.
    // for sequential execution of promises use normal for loop with async await

    await Promise.all(
      tags.map(async (tag) => {
        const foundTag = await Tag.findOne({ name: tag });
        if (foundTag) {
          post.tags.push(foundTag._id);
        } else {
          const newTag = await Tag.create({ name: tag });
          post.tags.push(newTag._id);
        }
      })
    );

    await post.save();

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
