const Notice = require("../models/Notice.model");

//Simple version, without validation or sanitation
exports.add_notice = (req, res) => {
  const Database = require("../models/Database");
  console.log("adding entry");
  console.log(req.body);

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  let notice = new Notice({
    text: req.body.text,
    date: today
  });

  notice
    .save()
    .then(doc => {
      console.log(doc);
      res.send("task Created successfully");
    })
    .catch(err => {
      console.error(err);
    });
};

exports.get_all_notices = (req, res) => {
  const Database = require("../models/Database");
  console.log("comeone asked to see all notices");
  Notice.find()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.delete_notice = (req, res) => {
  const Database = require("../models/Database");
  console.log("comeone asked to delete a notice");
  Notice.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send("deleted successfully");
  });
};
