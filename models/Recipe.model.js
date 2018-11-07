let mongoose = require("mongoose");
let validator = require("validator");

let RecipeSchema = new mongoose.Schema({
  title: {
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

  ingredients: {
    // type: [{type:String}],
    type: [String],
    required: true,
    unique: false,
    lowercase: false,
    timestamps: true,
    max: 1000
  },

  method: {
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

module.exports = mongoose.model("Recipe", RecipeSchema);
