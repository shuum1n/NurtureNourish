const express = require("express")
const router = express.Router()
const { UserController } = require("../controllers")

router.post("/users/register", UserController.createUser)
router.post("/users/login", UserController.loginUser)

module.exports = router
