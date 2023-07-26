const db = require('../connection');

const insertTask = (email, category) => {
  return db.query(`INSERT INTO tasks(task, category, date) VALUES ($1, $2)
    RETURNING *;`, [email, category])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { insertTask };
