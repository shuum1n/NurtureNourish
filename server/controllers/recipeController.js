const Recipe = require("../models/Recipe")
const Profile = require("../models/Profile")

var ImageKit = require("imagekit")
const yt = require("@citoyasha/yt-search")
const { image_search } = require("duckduckgo-images-api")
const { openAI } = require("../helpers/OpenAI")

class RecipeController {
  static async addRecipe(req, res) {
    try {
      const { recipes } = req.body
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      recipes.forEach(async (x) => {
        const recipe = new Recipe(x)
        await recipe.save()
        userProfile.favoriteRecipes.push(recipe._id)
        await userProfile.save()
      })
      res.status(201).json({
        message: "Recipe added successfully",
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }
  static async getRecipes(req, res) {
    try {
      const user = req.user
      const userProfile = await Profile.findById(user.profile)
      const recipes = []
      for (let i = 0; i < userProfile.favoriteRecipes.length; i++) {
        const recipe = await Recipe.findById(userProfile.favoriteRecipes[i])
        recipes.push(recipe)
      }
      // const newuser1 = await User.findById('65111f0e1c9b2d4d93ec75a3').populate('favoriteRecipes').exec();
      res.status(200).json(recipes)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      })
    }
  }

  static async imageRecognise(req, res, next) {
    try {
      // const FormData = require("form-data")
      // const form = new FormData()
      // form.append("ingredients", fs.createReadStream(path.join(__dirname, "tomat.png")))
      // await axios.post("https://api.cyborg1201.online/test", form)

      var imagekit = new ImageKit({
        publicKey: "public_lviJAdWFlozrKL+yzqkFSLUShsY=",
        privateKey: "private_c8HAKXDe/YQYuMoZKVaQ+FWfvDo=",
        urlEndpoint: "https://ik.imagekit.io/nfpxx9byw",
      })

      const data = await imagekit.upload({
        file: req.file.buffer,
        fileName: "ingredients.jpg",
        extensions: [{ name: "aws-auto-tagging", maxTags: 5, minConfidence: 95 }],
      })

      console.log(data, "OKKKK")
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      res.status(err.status || 500).json({ message: err.message })
    }
  }

  static async getAIRecipes(req, res, next) {
    try {
      const { ingredients } = req.body

      const ingredient = ingredients.join(", ")
      const query = `Given that someone is pregnant trimester 1
       and has the ingredients ${ingredient}, provide
       recommended Indonesian food recipes also nutrition result in bahasa indonesia in the following json format below, give 3 data in one array

       [{"title": "", "description": "", "ingredients": [], "instructions":[], "nutrition": ""}]`

      const search = await openAI(query)
      const results = JSON.parse(search[0]?.message?.content)

      // const results = [
      //   {
      //     title: "Ayam Kecap",
      //     description:
      //       "Ayam Kecap is a traditional Indonesian dish made with chicken and soy sauce. It is rich in protein and iron, which are essential for a healthy pregnancy.",
      //     ingredients: ["Ayam (chicken)", "Kecap (soy sauce)", "Nanas (pineapple)", "Jeruk (lime)"],
      //     instructions: [
      //       "1. Marinate the chicken in soy sauce for 30 minutes.",
      //       "2. Grill or fry the marinated chicken until cooked.",
      //       "3. Serve with pineapple and lime on the side.",
      //     ],
      //     nutrition: "Calories: 300, Protein: 25g, Iron: 2mg",
      //     inputIngredients: ["ayam", "nanas", "bayam", "jeruk"],
      //     thumb: "http://qcrimadad.org/wp-content/uploads/2018/11/resep-ayam-kecap.jpg",
      //     youtube: "https://www.youtube.com/watch?v=0gPUoVxM4kM",
      //   },
      //   {
      //     title: "Sayur Bayam",
      //     description:
      //       "Sayur Bayam is a nutritious Indonesian dish made with spinach. It is high in folate, which is important for fetal development.",
      //     ingredients: ["Bayam (spinach)", "Jeruk (lime)"],
      //     instructions: [
      //       "1. Wash and blanch the spinach.",
      //       "2. Squeeze lime juice over the spinach.",
      //       "3. Serve as a side dish with other main courses.",
      //     ],
      //     nutrition: "Calories: 50, Protein: 5g, Folate: 100mcg",
      //     inputIngredients: ["ayam", "nanas", "bayam", "jeruk"],
      //     thumb: "http://2.bp.blogspot.com/-a7IlhigjtkA/VA_g3PXvFxI/AAAAAAAAAi0/mWmj6y0M10o/s1600/Sayur%2BBening%2BBayam%2Bjagung.jpg",
      //     youtube: "https://www.youtube.com/watch?v=6hlNjngay2k",
      //   },
      //   {
      //     title: "Nasi Goreng",
      //     description:
      //       "Nasi Goreng is a popular Indonesian fried rice dish. It can be customized with various ingredients and is a good source of carbohydrates and protein.",
      //     ingredients: ["Ayam (chicken)", "Nanas (pineapple)", "Jeruk (lime)"],
      //     instructions: [
      //       "1. Cook the rice and let it cool.",
      //       "2. Stir-fry the chicken, pineapple, and lime with oil.",
      //       "3. Add the cooked rice and mix well.",
      //       "4. Serve with a fried egg on top.",
      //     ],
      //     nutrition: "Calories: 400, Protein: 20g, Carbohydrates: 50g",
      //     inputIngredients: ["ayam", "nanas", "bayam", "jeruk"],
      //     thumb: "https://poshjournal.com/wp-content/uploads/2019/08/nasi-goreng-recipe-indonesian-fried-rice-9.jpg",
      //     youtube: "https://www.youtube.com/watch?v=Js9FXCkn798",
      //   },
      // ]

      await Promise.all(
        results.map(async (x) => {
          const thumb = await image_search({ query: x.title, moderate: true })
          const youtube = await yt.search(x.title, 1)
          x.inputIngredients = ingredients
          x.thumb = thumb[0].image
          x.youtube = youtube[0].link
          x.youtubeThumb = youtube[0].thumbnail
          return x
        })
      )

      console.log(results)
      res.status(200).json(results)
    } catch (err) {
      console.log(err.response)
      res.status(err.status || 500).json({ message: err.message })
    }
  }
}

module.exports = RecipeController
