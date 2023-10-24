const User = require("../models/User")
const Profile = require("../models/Profile")

class ProfileController
{
  static async getProfile(req, res, next)
  {
    try
    {
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      console.log(user)
      res.status(200).json(userProfile)
    } catch (err)
    {
      console.log(err)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }

  static async updateProfile(req, res, next)
  {
    try
    {
      const { name, gender, date } = req.body
      let user = req.user
      console.log(user, "DARI PROFILE CONTROLLERRR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
      const userProfile = await Profile.findById(user.profile)
      if (!name || !gender || !date)
      {
        throw { message: "Invalid data format", status: 400 }
      }
      userProfile.name = name
      userProfile.gender = gender
      userProfile.date = date
      user = await user.save()
      await userProfile.save()
      res.status(200).json({
        message: "Profile updated successfully"
      })
    } catch (error)
    {
      console.log(error)
      res.status(error.status).json({
        message: error.message,
      })
    }
  }
}

module.exports = ProfileController
