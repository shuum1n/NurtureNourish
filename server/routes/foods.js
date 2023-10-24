const express = require("express")
const router = express.Router()
const FoodController = require("../controllers/foodController")

router.get("/foods", FoodController.getFoods)

module.exports = router
