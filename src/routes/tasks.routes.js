const express = require('express');
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const validateTask = require("../middlewares/validateTask.middleware");
const authJWT = require("../middlewares/authJWT.middleware");

router.get("/tasks", tasksController.getTasks);
router.get("/tasks/:id", tasksController.getTaskById);
router.post("/tasks", authJWT, validateTask, tasksController.postTask);
router.delete("/tasks/:id", authJWT, tasksController.deleteTask);
router.put("/tasks/:id", authJWT, tasksController.updateTask);

module.exports = router;