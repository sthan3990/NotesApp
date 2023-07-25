/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const profileQueries = require('../db/queries/profile');

router.get('/', (req, res) => {

  profileQueries.getuserProfile("user1@example.com")

    .then(result => {
      console.log(result);

      let templateVars = {
        user: {
          id: result.user_id,
          name: result.username,
          password: result.password,
          email: result.email
        }
      };

      res.render('profile',templateVars);

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
