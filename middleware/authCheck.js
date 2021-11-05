// Simple Middleware function which checks if the user is logged in or not by checking if the user object exists on req object.
// If the user is logged in or not can be checked on the front-end using a simple try-catch block

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ msg: 'Not Logged in!' });
  } else {
    next();
  }
};

module.exports = authCheck;
