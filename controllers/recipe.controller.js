const Recipe = require("../models/Recipe.model");

//Simple version, without validation or sanitation
exports.add_recipe = (req, res) => {
  console.log("adding recipe");
  console.log(req.body);

  let recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    method: req.body.method
  });
  console.log(recipe.ingredients.constructor);

  recipe
    .save()
    .then(doc => {
      console.log(doc);
      res.send("recipe Created successfully");
    })
    .catch(err => {
      console.error(err);
    });
};

exports.get_all_recipe = (req, res) => {
  console.log("someone asked to see all recipes");
  Recipe.find()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.delete_recipe = (req, res) => {
  console.log("someone asked to delete a recipe");
  Recipe.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send("deleted successfully");
  });
};
