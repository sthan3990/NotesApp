const db = require('../connection');
const bcrypt = require("bcrypt");

const getuserProfile = (id) => {
  return db.query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateuserProfile = (username, email, password) => {
  //const hasedPassword = bcrypt.hashSync(password, 10);

  const hasedPassword = "password";

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
