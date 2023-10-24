const PregnancyData = require("../models/Pregnancy")
const User = require("../models/User")
const Profile = require("../models/Profile")

class PregnancyController {
  static async addPregnancy(req, res, next) {
    try {
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      const { startDate } = req.body
      if (!startDate) {
        throw { name: "BadRequest", message: "Invalid pregnancy data" }
      }
      const pregData = new PregnancyData({
        startDate: startDate,
        childrenNumber: userProfile.pregnancyData.length + 1 || 1,
        dailyNutrition: [],
      })
      await pregData.save()
      userProfile.pregnancyData.push(pregData._id)
      await userProfile.save()
      res.status(200).json({
        message: "Pregnancy data added successfully",
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({
        message: error.message,
      })
    }
  }

  static async getPregnancy(req, res, next) {
    try {
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      const data = await PregnancyData.findById(userProfile.pregnancyData[userProfile.pregnancyData.length - 1])
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }
}

module.exports = PregnancyController
