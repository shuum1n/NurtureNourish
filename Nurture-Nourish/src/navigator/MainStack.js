import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Chat from "../screens/Chat"
import Dashboard from "../screens/Dashboard"
import Camera from "../screens/Camera"
import Preview from "../screens/Preview"
import Test from "../screens/Test"
import WelcomeScreen from "../screens/WelcomeScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import CreateProfileScreen from "../screens/CreateProfile"
import { useEffect, useState } from "react"
import LayoutScreen from "../screens/LayoutScreen"
import DashboardScreen from "../screens/DashboardScreen"
import FoodCategoryScreen from "../screens/FoodCategoryScreen"
import NutritionScreen from "../screens/NutritionScreen"
import NutritionDetailScreen from "../screens/NutritionDetailScreen"
import SavedRecipeScreen from "../screens/SavedRecipeScreen"
import RecipeDetailScreen from "../screens/RecipeDetailScreen"
import FoodListCategoryScreen from "../screens/FoodListCategoryScreen"
import AddNutritionScreen from "../screens/AddNutritionScreen"
import ValidationInputFindRecipeScreen from "../screens/ValidationInputFindRecipeScreen"
import RecipeRecommendationScreen from "../screens/RecipeRecommendationScreen"
import ProfileScreen from "../screens/ProfileScreen"

import { useSelector } from "react-redux"

export default function MainStack() {
  const Stack = createNativeStackNavigator()

  const isAuthenticated = useSelector((state) => state.isAuthenticated)

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <LayoutScreen>
        <Stack.Navigator screenOptions={{ animation: "none" }}>
          <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CreateProfile" component={CreateProfileScreen} />
        </Stack.Navigator>
      </LayoutScreen>
    )
  }

  return (
    <LayoutScreen>
      <Stack.Navigator screenOptions={{ animation: "none" }}>
        {/* <Stack.Screen options={{ headerShown: false }} name="DashboardGilang" component={Dashboard} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="Camera" component={Camera} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="Preview" component={Preview} />  */}

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Dashboard"
          component={DashboardScreen}
        />

        <Stack.Screen options={{ headerShown: false }} name="FoodListCategory" component={FoodListCategoryScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddNutrition" component={AddNutritionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ValidationInputFindRecipe" component={ValidationInputFindRecipeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="RecipeRecommendation" component={RecipeRecommendationScreen} />
        <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name="FoodCategory" component={FoodCategoryScreen} />
        <Stack.Screen options={{ headerShown: false }} name="NutritionList" component={NutritionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="NutritionDetail" component={NutritionDetailScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Saved" component={SavedRecipeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ProfileDetail" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CreateProfile" component={CreateProfileScreen} />
      </Stack.Navigator>
    </LayoutScreen>
  )
}

// export default function MainStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Dashboard" component={Dashboard} />
//       <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
//       <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
//       <Stack.Screen name="Preview" component={Preview} />
//       <Stack.Screen name="Test" component={Test} />
//     </Stack.Navigator>
//   )
// }
