let mongoose = require("mongoose");
let validator = require("validator");

let TodoTaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    timestamps: true,
    max: 1000,
    validate: value => {
      return !validator.isEmpty(value);
    }
  }
});

module.exports = mongoose.model("TodoTask", TodoTaskSchema);
