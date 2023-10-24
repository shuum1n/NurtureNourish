const User = require("../models/User")
const mongoose = require("mongoose")
const fs = require("fs")
const vision = require("@google-cloud/vision")
const Food = require("../models/Food")
const axios = require("axios")

const credentials = require("../application_default_credentials.json")
const client = new vision.ImageAnnotatorClient()

class FoodController {
  static async uploadIngredients(req, res) {
    try {
      console.log(req.file)
      const fileName = req.file.path
      const request = { image: { content: fs.readFileSync(fileName) } }
      const [result] = await client.objectLocalization(request)
      const objects = result.localizedObjectAnnotations
      const ingredients = []
      objects.forEach((object) => {
        console.log(`Name: ${object.name}`)
        if (object.name !== "Food" && object.name !== "Vegetable" && object.name !== "Fruit") {
          if (!ingredients.includes(object.name)) {
            ingredients.push(object.name)
          }
        }
        console.log(`Confidence: ${object.score}`)
        const vertices = object.boundingPoly.normalizedVertices
        vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`))
      })
      fs.unlink(req.file.path, (err) => {
        if (err) {
          throw err
        }
      })
      res.status(200).json({
        ingredients: ingredients,
        message: "OK",
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }
  static async getFoods(req, res) {
    const { key } = req.query
    try {
      let params = {}

      if (key) params = { key }

      res.status(200).json(await Food.find(params))
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }
}

module.exports = FoodController
