const express = require("express")
const multer = require("multer")
const RecipeController = require("../controllers/recipeController")

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } })

router.post("/recipes", RecipeController.addRecipe)
router.get("/recipes", RecipeController.getRecipes)

router.post("/recipes/recognise", upload.single("ingredients"), RecipeController.imageRecognise)
router.post("/recipes/get", RecipeController.getAIRecipes)
module.exports = router
