const Recipe = require("../models/Recipe.model");

//Simple version, without validation or sanitation
exports.add_recipe = (req, res) => {
  console.log("adding recipe");
  //console.log(req.body);

  let recipe = new Recipe({
    title: req.body.title,
    ingredientsList: req.body.ingredientsList,
    method: req.body.method
  });
  //console.log(recipe.ingredientsList);

  recipe
    .save()
    .then(doc => {
      //      console.log(doc);
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
      //console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.delete_recipe = (req, res) => {
  console.log("someone asked to delete a recipe");
  //console.log(req.params.id)
  Recipe.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send("deleted successfully");
  });
};

exports.update_recipe = (req, res) => {
  console.log("someone asked to edit a recipe");
  console.log(req.body);
  Recipe.findByIdAndUpdate(req.body._id, req.body, err=>{
    if(err) return next(err);
    res.send("updated!")
  });
};
