
const DailyNutrition = require("../models/DailyNutrition")
const Profile = require("../models/Profile")
const PregnancyData = require("../models/Pregnancy")
const { openAI } = require("../helpers/OpenAI")

class NutritionController {
  static async getNutrition(req, res, next) {
    try {
      const user = req.user;
      const userProfile = await Profile.findById(user.profile);
      const pregData = await PregnancyData.findById(userProfile.pregnancyData[userProfile.pregnancyData.length - 1]);
      const data = [];
      for (let i = 0; i < pregData.dailyNutrition.length; i++) {
        const nutrition = await DailyNutrition.findById(pregData.dailyNutrition[i]);
        data.push(nutrition);
      }
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async getNutritionByProfileId(req, res, next) {
    try {
      const { ProfileId } = req.params
      const data = await Nutrition.find({ ProfileId })

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }

  static async addNutrition(req, res, next) {
    try {
      const { date, input } = req.body
      const user = req.user
      const userProfile = await Profile.findById(user.profile)

      if (!date || !input || input.length === 0) throw { message: "Invalid data format", status: 400 }

      const AKG = {
        Energi_kkal: { value: 1900 },
        Protein_g: { value: 60 },
        Lemak_Total: { value: 70 },
        Omega_3: { value: 0.6 },
        Omega_6: { value: 7 },
        Karbohidrat_g: { value: 250 },
        Serat_g: { value: 25 },
        Air_ml: { value: 2700 },
        Vitamin_A_re: { value: 800 },
        Vitamin_C_mcg: { value: 85 },
        Folat: { value: 600 },
        Kolin: { value: 450 },
        Vitamin_B5: { value: 6 },
        Vitamin_B3: { value: 18 },
        Vitamin_B6: { value: 2.6 },
        Vitamin_B1: { value: 1.4 },
      }

      const inputToStr = input.map((x) => x.name + " " + x.weight + "gr").join(", ")
      const query = `give information about ${inputToStr} bayam for women trimester 1 with output only for this json format, dont set gram unit on result in bahasa indonesia
      {
        Energi_kkal: { value : number, information : string},
        Protein_g: { value : number, information : string },
        Lemak_Total: { value : number, information : string},
        Omega_3: { value : number, information : string },
        Omega_6: { value : number, information : string},
        Karbohidrat_g": { value : number, information : string },
        Serat_g: { value : number, information : string },
        Air_ml: { value : number, information : string },
        Vitamin_A_re: { value : number, information : string },
        Vitamin_C_mcg: { value : number, information : string },
        Folat: { value : number, information : string },
        Kolin: { value : number, information : string },
        Vitamin_B5: { value : number, information : string },
        Vitamin_B3: { value : number, information : string },
        Vitamin_B6: { value : number, information : string },
        Vitamin_B1: { value : number, information : string },
        conclusion : string
      }`

      const openai = await openAI(query)
      const details = JSON.parse(openai[0]?.message?.content)

      for (let x in details) {
        console.log(x, details[x]?.value, AKG[x]?.value)
        if (x !== "conclusion") {
          details[x].percentage = Math.ceil((details[x]?.value / AKG[x]?.value) * 100)
        }
      }

      const pregData = await PregnancyData.findById(userProfile.pregnancyData[userProfile.pregnancyData.length - 1])

      const nutrition = new DailyNutrition({
        date,
        details,
        input: inputToStr,
        ProfileId: user.profile,
      })

      await nutrition.save()

      pregData.dailyNutrition.push(nutrition._id)

      await pregData.save()

      res.status(201).json({ message: "OK", nutrition })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
  static async deleteNutrition(req, res, next) {
    try {
      const { id } = req.params
      const pregData = await PregnancyData.findById(userProfile.pregnancyData[userProfile.pregnancyData.length - 1])
      const index = pregData.dailyNutrition.indexOf(id)
      pregData.dailyNutrition.splice(index, 1)
      await DailyNutrition.findByIdAndDelete(id)
      await pregData.save()
      res.status(200).json({
        message: "Nutrition deleted successfully",
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = { NutritionController }
