const router = require("express").Router();

const { createPost, getPosts } = require("./controller");

router.post("/", createPost);
router.get("/", getPosts);

module.exports = router;
