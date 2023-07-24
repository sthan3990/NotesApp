const db = require('../connection');

const getuserProfile = (email) => {
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateuserProfile = (name, email, password) => {
  return db.query(`UPDATE users SET name = $1, email = $2, password = $3
       WHERE users.email = $2
       RETURNING *;`, [name, email, password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getuserProfile, updateuserProfile};
