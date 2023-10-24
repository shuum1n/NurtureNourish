const mongoose = require("mongoose")

const dailyNutritionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  details: {},
  input: String,
  ProfileId: String,
})

const DailyNutrition = new mongoose.model("dailyNutrition", dailyNutritionSchema)

module.exports = DailyNutrition
