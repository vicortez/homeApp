const express = require("express");
const router = express.Router();

const notice_controller = require("../controllers/notice.controller");

// a simple test url to check that all of our files are communicating correctly.
//router.get("/test", todoTask_controller.test);

router.get("/all", notice_controller.get_all_notices);

//router.get('/byprice/:price', product_controller.product_by_price);

router.post('/', notice_controller.add_notice);

// router.get('/:id', todoTask_controller.get_task_by_id);

// router.put('/:id/update', product_controller.product_update);

router.delete('/:id', notice_controller.delete_notice);

module.exports = router;
