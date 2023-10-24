const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  nutrition: String,
  inputIngredients: Array,
  thumb: String,
  youtube: String,
  youtubeThumb: String,
})

const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe
