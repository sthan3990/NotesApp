const db = require('../connection');


const insertTask = (message, category, userID, categoryName) => {
  return db.query(`INSERT INTO tasks(item_name, category_id, user_id, status, date) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`, [message, category, userID, categoryName])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { insertTask };
