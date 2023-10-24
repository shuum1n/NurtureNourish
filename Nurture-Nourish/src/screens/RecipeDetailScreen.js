import { Alert, Button, Image, Linking, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { saveRecipes } from "../stores/actionCreator"


export default function RecipeDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  let { recipe, status } = route.params
  const [show, setShow] = useState()

  const handleSaveRecipes = () => {
    dispatch(saveRecipes([recipe])).then(() => {
      Alert.alert("Saved", `Recipe ${recipe.title} saved to bookmark.`, [{ text: "OK", onPress: () => console.log("Tombol OK ditekan") }], {
        cancelable: false,
      })
      setShow("saved")
    })
  }

  useEffect(() => {
    setShow(status)
  }, [])

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>
        }
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Resep Makanan</Text>}
        rightContent={
          <>
            {show === "unsave" ? (
              <Pressable onPress={() => handleSaveRecipes()}>
                <Feather name="bookmark" size={28} color="black" />
              </Pressable>
            ) : (
              ""
            )}
            <FontAwesome5 name="user-circle" size={28} color="black" />
          </>
        }
      />
      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10 }}>
          <Pressable onPress={() => Linking.openURL(recipe.youtube)} style={{ marginBottom: 4 }}>
            <View
              style={{
                borderRadius: 15,
                borderWidth: 1,
                height: 230,
                width: "100%",
                borderColor: "rgb(226 232 240)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                source={{ uri: recipe?.thumb }}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 14,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 5,
                }}
              >
                Youtube
              </Text>
            </View>
          </Pressable>
          <View>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginTop: 20 }}>{recipe?.title}</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Deskripsi:</Text>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "justify" }}>{recipe?.description}</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Nutrisi:</Text>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "justify" }}>{recipe?.nutrition}</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Bahan - bahan:</Text>
            {recipe?.ingredients.map((ingredient, i) => {
              return (
                <View key={i} style={{ flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>{i + 1}. </Text>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "justify", flex: 1 }}>{ingredient}</Text>
                </View>
              )
            })}
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Langkah- langkah:</Text>
            {recipe?.instructions.map((instruction, i) => {
              return (
                <View key={i} style={{ flexDirection: "row", flex: 1 }}>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>{i + 1}. </Text>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, flex: 1 }}>{instruction}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 30 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
