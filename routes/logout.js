const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
  // clear session cookie
  req.session = null;
  // redirect to login page
  res.redirect('/login');

});

module.exports = router;

