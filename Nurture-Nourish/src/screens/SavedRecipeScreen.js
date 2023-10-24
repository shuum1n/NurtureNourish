import { Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import RecipeCard from "../components/RecipeCard"
import RecipeSaveCard from "../components/RecipeSaveCard"
import BottomComponent from "../components/BottomComponent"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSavedRecipes } from "../stores/actionCreator"

export default function SavedRecipeScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const savedRecipes = useSelector((state) => state.getSavedRecipes)

  useEffect(() => {
    dispatch(getSavedRecipes())
  }, [])


  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>Resep</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>Makanan Tersimpan</Text>
          </>
        }
        rightContent={
          <>
            <Pressable
              onPress={() => {
                navigation.navigate("ProfileDetail")
                console.log("clicked")
              }}
            >
              <FontAwesome5 name="user-circle" size={28} color="black" />
            </Pressable>
          </>
        }
      />

      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10 }}>
          <Pressable
            onPress={() => navigation.navigate("Camera")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "rgb(203 213 225)",
            }}
          >
            <View style={{ width: 60 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  resizeMode="cover"
                  style={{ width: "60%", height: undefined, aspectRatio: 1 }}
                  source={require("../images/healthy-food.png")}
                />
                <Image
                  resizeMode="contain"
                  style={{ width: "100%", height: undefined, opacity: 0.6, aspectRatio: 1, position: "absolute" }}
                  source={require("../images/scanner.png")}
                />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>Bingung mau masak apa?</Text>
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15 }}>Temukan resep makanan sehat</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ marginTop: 10 }}>
          {savedRecipes.map((item, index) => (
            <RecipeSaveCard key={index} recipe={item} />
          ))}
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 15 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
