const TodoTask = require("../models/todoTask.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.add_todoTask = (req, res) => {
  console.log("adding entry");
  console.log(req.body);

  let todo = new TodoTask({
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

exports.get_all_todoTasks = (req, res) => {
  console.log("comeone asked to see all");
  TodoTask.find()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.delete_todoTask = (req, res) => {
  console.log("comeone asked to delete");
  TodoTask.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send("deleted successfully");
  });
};
