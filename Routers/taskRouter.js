const taskController = require("../Controllers/taskController");
const router = require("express").Router();

router.post("/create", taskController.addTask);
router.get("/get", taskController.getTasks);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
