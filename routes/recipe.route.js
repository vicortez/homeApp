const express = require("express");
const router = express.Router();

const recipe_controller = require("../controllers/recipe.controller");

// a simple test url to check that all of our files are communicating correctly.
//router.get("/test", recipe_controller.test);

router.get("/all", recipe_controller.get_all_recipe);

//router.get('/byprice/:price', product_controller.product_by_price);

router.post('/', recipe_controller.add_recipe);

// router.get('/:id', todoTask_controller.get_task_by_id);

// router.put('/:id/update', product_controller.product_update);

router.delete('/:id', recipe_controller.delete_recipe);

module.exports = router;