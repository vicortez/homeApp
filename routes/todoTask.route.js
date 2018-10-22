const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const todoTask_controller = require("../controllers/todoTask.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", todoTask_controller.test);

router.get("/all", todoTask_controller.get_all_todoTasks);

//router.get('/byprice/:price', product_controller.product_by_price);

router.post('/', todoTask_controller.add_todoTask);

// router.get('/:id', todoTask_controller.get_task_by_id);

// router.put('/:id/update', product_controller.product_update);

router.delete('/:id', todoTask_controller.delete_todoTask);

module.exports = router;
