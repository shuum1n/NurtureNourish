const express = require("express")
const router = express.Router()

const { NutritionController } = require("../controllers")

router.get("/nutritions", NutritionController.getNutrition);
router.post("/nutritions", NutritionController.addNutrition);
router.delete("/nutritions/:id", NutritionController.deleteNutrition);

module.exports = router
