<<<<<<< HEAD
<<<<<<< HEAD
/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
=======
=======
>>>>>>> 68e77f9 (Implemented database.js Adding queries for login, register, Also fixed)
/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const bcrypt = require("bcrypt");

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/register', (req, res) => {
  let usersArray = [];

  // grab all user emails
  userQueries.getUsers()
    .then(users => {
      usersArray.push(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  // check if email is already used
  let userExists = 0;

  for (let user in usersArray) {
    if (user === req.body.email) {
      userExists = 1;
    }
  }

  if (userExists !== 1) {
    try {
      const email = req.body.email;
      const name = req.body.name;
      const salt = bcrypt.genSaltSync(10);

      // use salt to hash password
      const password = bcrypt.hashSync(req.body.password, salt);

      // insert into database
      userQueries.insertUser(name, password, email);
    }
    catch (err) {
      console.log(err);
    }

  }



});

module.exports = router;
<<<<<<< HEAD
>>>>>>> d2a91f8 (Create Add User Feature)
=======
=======
/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
>>>>>>> 578b71b (Implemented database.js Adding queries for login, register, Also fixed)
>>>>>>> 68e77f9 (Implemented database.js Adding queries for login, register, Also fixed)
