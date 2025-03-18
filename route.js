const router = require("express").Router();
const upload = require("./upload.middleware");

const { createPost, getPosts } = require("./controller");

// POST request to create a new post with image upload
router.post("/", upload().single("image"), createPost);

// GET request to get all posts
router.get("/", getPosts);

module.exports = router;
