const db = require("../connection");

const insertTask = (message, category, userID) => {
  let theDate = new Date();
  theDate.getUTCDate();

  return db
    .query(
      `INSERT INTO tasks(id, name, category_id, user_id, completed, date) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,
      [message, category, userID, 'FALSE', theDate]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// gets name, tasks, category name for specific user, also gets categoryName from categories table if no tasks exist for specific user
const getTasks = async (id, userID) => {
  try {
    const categoryName = (
      await db.query(`SELECT name FROM categories WHERE id = $1;`, [id])
    ).rows[0].name;
    const tasks = (
      await db.query(
        `SELECT categories.name AS cat_name, users.id AS id, categories.id AS c_id, users.username, tasks.name, tasks.completed, tasks.date AS date, tasks.id AS t_id FROM categories JOIN tasks ON categories.id = tasks.category_id JOIN users ON users.id = tasks.user_id WHERE categories.id = $1 AND users.id = $2;`,
        [id, userID]
      )
    ).rows;
    return { categoryName, tasks };
  } catch (err) {
    console.error(err.message);
  }
};

// gets all tasks group by category for display on index page given user id
const getAllTasks = async (userID) => {
  try {
    const allTasks = (
      await db.query(
        `SELECT categories.name as cat_name, tasks.name FROM categories JOIN tasks ON categories.id = tasks.category_id JOIN users ON users.id = tasks.user_id WHERE users.id = $1 GROUP BY categories.name, tasks.name;`,
        [userID]
      )
    ).rows;
    return { allTasks };
  } catch (err) {
    console.error(err.message);
  }
};

// delete task given id
const deleteTask = async (id) => {
  try {
    await db.query(
      `
    DELETE FROM tasks WHERE id = $1`,
      [id]
    );
  } catch (error) {
    console.error(error.stack);
  }
};

// edit task given id to show
const editTask = async (taskId, taskName, categoryName) => {
  try {
    const catId = (
      await db.query(`SELECT id FROM categories WHERE name = $1`, [
        categoryName,
      ])
    ).rows[0].id;
    await db.query(
      "UPDATE tasks SET category_id = $1 FROM categories WHERE tasks.category_id = categories.id AND tasks.id = $2",
      [catId, taskId]
    );
    await db.query("UPDATE tasks SET name = $1 WHERE id = $2", [
      taskName,
      taskId,
    ]);
  } catch (error) {
    console.error(error.stack);
  }
};

// gets task given taskid for edit page
const getTaskById = async (id, userID) => {
  try {
    const tasks = (
      await db.query(
        `SELECT categories.name AS cat_name, users.id AS u_id, categories.id AS c_id, users.username, tasks.name, tasks.completed, tasks.date, tasks.id AS id FROM categories JOIN tasks ON categories.id = tasks.category_id JOIN users ON users.id = tasks.user_id WHERE tasks.id = $1 AND users.id = $2;`,
        [id, userID]
      )
    ).rows;
    const catNames = (await db.query(`SELECT name FROM categories;`)).rows;
    return { tasks, catNames };
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getTasks,
  deleteTask,
  getAllTasks,
  editTask,
  getTaskById,
  insertTask,
};
