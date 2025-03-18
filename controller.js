const Post = require("./models/post.model");
const Tag = require("./models/tag.model");
const messages = require("./constant");

/**
 * @route POST /post
 * @desc Create a new post
 * @param {string} title - Title of the post
 * @param {string} desc - Description of the post
 * @param {string} tags - Comma separated list of tag names
 * @param {file} image - Image file (uploaded to Cloudinary)
 * @returns {Object} Created post
 */
const createPost = async (req, res) => {
  try {
    const { title, desc, tags } = req.body;

    //check if all fields are filled
    //if not, return a 400 status code with a message

    if (!title || !desc || !tags || tags.length === 0) {
      return res.status(400).json({ message: messages.fieldsRequired });
    }

    const post = await Post.create({ title, desc, image: req.file.path });

    //for parellel execution of promises
    //Promise.all() is used to wait for all promises to resolve and then return the result.
    // for sequential execution of promises use normal for loop with async await

    const allTags = tags.split(",");
    const trimedTags = allTags.map((tag) => tag.trim());
    await Promise.all(
      trimedTags.map(async (tag) => {
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

/**
 * @route GET /posts
 * @desc Retrieve all posts with optional filtering, sorting, and pagination
 * @param {number} [page=1] - Page number for pagination
 * @param {number} [limit=10] - Number of posts per page
 * @param {string} [sort="createdAt"] - Sorting field
 * @param {string} [keyword] - Keyword to search in title or description
 * @param {string} [tag] - Filter posts by tag name
 * @returns {Array} List of posts
 */
const getPosts = async (req, res) => {
  try {
    const {
      sort = "createdAt",
      limit = 10,
      page = 1,
      keyword,
      tag,
      ...rest
    } = req.query;

    if (rest && Object.keys(rest).length > 0) {
      return res.status(400).json({ message: messages.invalidQuery });
    }
    let query = [];
    if (keyword) {
      //search for posts with title or desc containing the keyword
      //case-insensitive search using $options : "i"
      query.push({
        $match: {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { desc: { $regex: keyword, $options: "i" } },
          ],
        },
      });
    }

    if (tag) {
      const foundTag = await Tag.findOne({ name: tag });
      //if tag is found, search for posts with the tag
      if (foundTag && foundTag._id) {
        query.push({
          $match: {
            tags: { $in: [foundTag._id] },
          },
        });
      }
    }

    //this is not required for the assignment but I'm showing all the tags in a single array with the post
    query.push(
      ...[
        {
          $lookup: {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tags",
          },
        },
        {
          $unwind: "$tags",
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            desc: { $first: "$desc" },
            image: { $first: "$image" },
            tags: { $push: "$tags.name" },
            createdAt: { $first: "$createdAt" },
          },
        },
      ]
    );

    //to sort the posts based on the sort query parameter
    //default sort is createdAt
    query.push({
      $sort: {
        [sort]: 1,
      },
    });
    // to skip the posts based on the page number
    //default page is 1
    query.push({
      $skip: (Number(page) - 1) * Number(limit),
    });
    //to limit the number of posts per page
    //default limit is 10
    query.push({
      $limit: Number(limit),
    });

    const posts = await Post.aggregate(query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
};
