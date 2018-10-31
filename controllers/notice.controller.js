const Notice = require("../models/Notice.model");

//Simple version, without validation or sanitation
exports.add_notice = (req, res) => {
  console.log("adding entry");
  console.log(req.body);

  let notice = new Notice({
    text: req.body.text
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
  console.log("comeone asked to delete a notice");
  Notice.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send("deleted successfully");
  });
};
