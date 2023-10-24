const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
  food_key: String,
  name: String,
  category_id: Number,
  key: String,
  category_name: String,
  image: String,
  thumbnail_big: String,
  nutrition: String,
  thumbnail: String,
  share_message: String,
});

const Food = new mongoose.model('food', foodSchema);

module.exports = Food;