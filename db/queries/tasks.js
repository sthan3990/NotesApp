const db = require('../connection');


const insertTask = (message, category, userID, completed, theDate) => {
  return db.query(`INSERT INTO tasks(name, category_id, user_id, completed, date) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`, [message, category, userID, completed, theDate])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { insertTask };
