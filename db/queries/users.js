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


module.exports = { getUsers, insertUser};
