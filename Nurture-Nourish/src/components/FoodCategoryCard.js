import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { Image, Pressable, Text, View } from "react-native"

export default function FoodCategoryCard({ name, imgUrl, type }) {
  const navigation = useNavigation()

  return (
    <Pressable
      Pressable
      onPress={() => navigation.navigate("FoodListCategory", { name, imgUrl, type })}
      style={{
        padding: 10,
        width: "48%",
        height: 150,
        //  borderWidth: 2,
        // borderColor: "rgb(203 213 225)",
        alignItems: "center",
        borderRadius: 20,
      }}
    >
      <Image style={{ width: 90, height: undefined, aspectRatio: 1 }} source={imgUrl} />
      <Text style={{ fontFamily: "Poppins-SemiBold", marginTop: 10, fontSize: 14, textAlign: "center" }}>{name}</Text>
    </Pressable>
  )
}
