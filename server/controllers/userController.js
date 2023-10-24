const User = require("../models/User")
const Profile = require("../models/Profile")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../helpers/jwtHelper")

class UserController
{
  static async createUser(req, res, next)
  {
    try
    {
      const { username, email, password } = req.body
      const newProfile = new Profile({
        name: "test",
        gender: "test",
        birthDate: new Date(),
        pregnancyData: [],
        favoriteRecipes: []
      })
      let savedProfile = await newProfile.save()
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        profile: savedProfile._id,
      })
      await newUser.save()
      res.status(201).json({
        message: "User created successfully",
      })
    } catch (error)
    {
      let code = 500;
      if (error.name === "ValidationError")
      {
        error.message = "Invalid data format"
        code = 400
      }
      else if (error.name === "MongoServerError")
      {
        error.message = "Duplicate key error"
        code = 400
      }
      res.status(code).json({
        message: error.message
      })
    }
  }

  static async loginUser(req, res)
  {
    try
    {
      const { username, password } = req.body
      let user = null;

      if (username)
      {
        user = await User.findOne({ username: username })
        if (!user)
        {
          user = await User.findOne({ email: username })
        }
      }
      if (!user) {
        throw new Error("Invalid credentials, please try again")
      } else {
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              const access_token = generateToken({ id: user["_id"] })
              res.status(200).json({
                access_token: access_token,
                user: { username, email: user.email, id: user.id },
                message: "Successfully logged in",
              })
            } else {
              res.status(401).json({
                message: "Invalid credentials, please try again",
              })
            }
          })
      }
    } catch (error)
    {
      // console.log(error)
      res.status(401).json({
        message: error.message,
      })
    }
  }
}

module.exports = { UserController }
