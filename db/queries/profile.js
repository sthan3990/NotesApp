<<<<<<< HEAD
const db = require('../connection');
const bcrypt = require("bcrypt");

const getuserProfile = (email) => {
<<<<<<< HEAD
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
=======
  return db.query(`SELECT * FROM users WHERE email = $1`, [email])
>>>>>>> 2ad0781 (Create Update Profile Feature)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateuserProfile = (username, email, password) => {
  const hasedPassword = bcrypt.hashSync(password, 10);

  return db.query(`UPDATE users SET username = $1, email = $2, password = $3
       WHERE users.email = $2;`, [username, email, hasedPassword])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getuserProfile, updateuserProfile};
=======
const db = require('../connection');
const bcrypt = require("bcrypt");
const bcrypt = require("bcrypt");

const getuserProfile = (email) => {
<<<<<<< HEAD
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
=======
  return db.query(`SELECT * FROM users WHERE email = $1`, [email])
>>>>>>> 2ad0781 (Create Update Profile Feature)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateuserProfile = (username, email, password) => {
  const hasedPassword = bcrypt.hashSync(password, 10);

  return db.query(`UPDATE users SET username = $1, email = $2, password = $3
       WHERE users.email = $2;`, [username, email, hasedPassword])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getuserProfile, updateuserProfile};
