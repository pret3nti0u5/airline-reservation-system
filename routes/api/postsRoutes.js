const router = require('express').Router();
const Post = require('../../models/post');
const authCheck = require('../../middleware/authCheck');
const User = require('../../models/user');

router.get('/', authCheck, async (req, res) => {
  try {
    const posts = await Post.find().sort({ updatedAt: 'asc' });
    res.send(posts);
  } catch (e) {
    res.status(500).send({ msg: 'Internal Server Error!' });
  }
});

module.exports = router;
