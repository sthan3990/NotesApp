const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const insertUser = (name, password, email) => {
  return db.query(`INSERT INTO users (name, password, email)
       VALUES ($1, $2, $3)
       RETURNING *;`, [name, password, email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

<<<<<<< HEAD
=======

>>>>>>> 578b71b (Implemented database.js Adding queries for login, register, Also fixed)
module.exports = { getUsers, insertUser};
