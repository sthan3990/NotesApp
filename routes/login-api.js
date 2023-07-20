/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const loginQueries = require('../db/queries/login');
const bcrypt = require("bcrypt");

router.post('/login', (req, res) => {

  const enteredEmail = req.params.enteredEmail;
  const enteredPassword = req.params.enteredPassword;

  loginQueries.getprofileData()

    .then(result => {

      // compare email
      if (result[0].email === enteredEmail) {

        // compare password
        if (bcrypt.compareSync(enteredPassword, result[0].password) === true) {

          // create cookie
          req.session.userEmail = result.email;

          res.redirect('/main');

        }
      }
      // password did not match try again
      else {
        res.status(400);
        res.redirect("/login");
      }
    })

    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
