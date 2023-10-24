const express = require("express")
const router = express.Router()
const FoodController = require("../controllers/foodController")

const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/food/upload", upload.single("ingredients"), FoodController.uploadIngredients)



module.exports = router
