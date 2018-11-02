const ShoppingListItem = require("../models/ShoppingListItem.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.add_shoppingListItem = (req, res) => {
  console.log("adding shoppingListItem");
  console.log(req.body);

  let todo = new ShoppingListItem({
    text: req.body.text
  });

  todo
    .save()
    .then(doc => {
      console.log(doc);
      res.send("task Created successfully");
    })
    .catch(err => {
      console.error(err);
    });
};

exports.get_all_shoppingListItems = (req, res) => {
  console.log("comeone asked to see all shoppingListItems");
  ShoppingListItem.find()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.delete_shoppingListItem = (req, res) => {
  console.log("comeone asked to delete a shoppingListItem");
  ShoppingListItem.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send("deleted successfully");
  });
};
