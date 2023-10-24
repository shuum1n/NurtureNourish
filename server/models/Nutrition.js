const mongoose = require("mongoose")

const nutritionSchema = new mongoose.Schema({
  date: { type: Date },
  details: { type: Object },
  ProfileId: { type: Number },
  totalAKG: { type: Number },
  totalNutrition: { type: Number },
  percentage: { type: Number },
})

const Nutrition = mongoose.model("nutrition", {
  date: { type: Date },
  details: { type: Object },
  ProfileId: { type: Number },
  totalAKG: { type: Number },
  totalNutrition: { type: Number },
  percentage: { type: Number },
})

module.exports = Nutrition
