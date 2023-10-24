import { getDailyTypes, getFoodTypes, getRecipesTypes, getSavedRecipesTypes, isAuthenticatedTypes } from "./actionTypes"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function isAuthenticatedAction(payload) {
  return { type: isAuthenticatedTypes, payload }
}
export function getDailyAction(payload) {
  return { type: getDailyTypes, payload }
}
export function getFoodByKeyAction(payload) {
  return { type: getFoodTypes, payload }
}
export function getRecipesAction(payload) {
  return { type: getRecipesTypes, payload }
}
export function getSavedRecipesAction(payload) {
  return { type: getSavedRecipesTypes, payload }
}

export function login(username, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://192.168.100.87:3000/users/login", { username, password })
      console.log("📌 data: ", data)
      await AsyncStorage.setItem("access_token", data.access_token)
      await AsyncStorage.setItem("email", data.user.email)
      await AsyncStorage.setItem("id", data.user.id)
      await AsyncStorage.setItem("username", data.user.username)
      dispatch(isAuthenticatedAction(true))
    } catch (err) {
      console.log(err)
      alert(err.response.data)
      throw err
    }
  }
}

export function register(username, email, password, name, gender, date) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://192.168.100.87:3000/users/register", { username, email, password, name, gender, date })
      return data
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function getDaily() {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const { data } = await axios({
        url: "http://192.168.100.87:3000/nutritions",
        method: "GET",
        headers: { access_token: token },
      })
      dispatch(getDailyAction(data.reverse()))
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function getFoodByKey(key) {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const { data } = await axios({
        url: "http://192.168.100.87:3000/foods?key=" + key,
        method: "GET",
        headers: { access_token: token },
      })
      dispatch(getFoodByKeyAction(data))
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function getRecipes(ingredients) {
  console.log("📌 ingredients: ", ingredients)
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const { data } = await axios({
        url: "http://192.168.100.87:3000/recipes/get",
        method: "POST",
        headers: { access_token: token },
        data: { ingredients },
      })
      console.log(data)
      dispatch(getRecipesAction(data))
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function getSavedRecipes() {
  console.log("masuk")
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const { data } = await axios({
        url: "http://192.168.100.87:3000/recipes",
        method: "GET",
        headers: { access_token: token },
      })
      dispatch(getSavedRecipesAction(data.reverse()))
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function addNutritions(ingredients, date) {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const { data } = await axios({
        url: "http://192.168.100.87:3000/nutritions",
        method: "POST",
        headers: { access_token: token },
        data: { input: ingredients, date },
      })

      console.log(data)
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function saveRecipes(recipes) {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")

      const { data } = await axios({
        url: "http://192.168.100.87:3000/recipes",
        method: "POST",
        headers: { access_token: token },
        data: { recipes },
      })

      console.log(data)
      dispatch(getSavedRecipes())
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}
