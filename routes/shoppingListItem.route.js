const express = require("express");
const router = express.Router();

const shoppingListItem_controller = require("../controllers/shoppingListItem.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", shoppingListItem_controller.test);

router.get("/all", shoppingListItem_controller.get_all_shoppingListItems);

//router.get('/byprice/:price', product_controller.product_by_price);

router.post('/', shoppingListItem_controller.add_shoppingListItem);

// router.get('/:id', shoppingListItem_controller.get_task_by_id);

// router.put('/:id/update', product_controller.product_update);

router.delete('/:id', shoppingListItem_controller.delete_shoppingListItem);

module.exports = router;
