// Boilerplate route for getting currently logged in user.

const router = require('express').Router();
const authCheck = require('../../middleware/authCheck');

router.get('/', authCheck, (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(500).json({ msg: 'Internal Server Error!' });
  }
});

module.exports = router;
