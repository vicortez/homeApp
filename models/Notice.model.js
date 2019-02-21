let mongoose = require("mongoose");
let validator = require("validator");

let NoticeSchema = new mongoose.Schema({
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
  },
  date:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Notice", NoticeSchema);
