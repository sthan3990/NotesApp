const express = require("express");
const router = express.Router();
const taskQueries = require("../db/queries/tasks");

// renders tasks belonging to specific user on each category page
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const userID = req.session.user_id;
  taskQueries
    .getTasks(id, userID)
    .then(({ categoryName, tasks }) => {
      res.render("category", { categoryName, tasks });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//deletes task
router.post("/:c_id/:id/delete", (req, res) => {
  const id = req.params.id;
  const c_id = req.params.c_id;
  taskQueries
    .deleteTask(id)
    .then((result) => {
      res.redirect(`/tasks/${c_id}`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// gets individual task info for the edit page
router.get("/edit/:c_id/:id", (req, res) => {
  const id = req.params.id;
  const userID = req.session.user_id;
  taskQueries
    .getTaskById(id, userID)
    .then(({ tasks, catNames }) => {
      res.render("edit", { tasks, catNames });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// updates individual task and reroutes to category page
router.post("/edit/:c_id/:id", (req, res) => {
  const taskId = req.params.id;
  const taskName = req.body.taskname;
  const categoryName = req.body.category;
  taskQueries
    .editTask(taskId, taskName, categoryName)
    .then(res.redirect(`/`))
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// updates task to completed / true
router.post("/:c_id/:id/complete", (req, res) => {
  const id = req.params.id;
  const c_id = req.params.c_id;
  taskQueries
    .completeTask(id)
    .then((result) => {
      res.redirect(`/tasks/${c_id}`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
