import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect } from "react"
import { Image, Pressable, Text, View } from "react-native"

export default function FoodCard({ food }) {
  const navigation = useNavigation()
  const route = useRoute()

  function status(status) {
    if (status == "not_allowed") {
      return <AntDesign name="closecircle" size={18} color="red" />
    } else if (status == "little_allowed") {
      return <FontAwesome5 name="exclamation-circle" size={18} color="orange" />
    } else {
      return <FontAwesome name="check-circle" size={20} color="green" />
    }
  }

  return (
    <Pressable
      onPress={() => navigation.navigate("NutritionList")}
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "rgb(203 213 225)",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 80, marginRight: 10 }}>
          <Image resizeMode="contain" style={{ width: "100%", borderRadius: 10, height: undefined, aspectRatio: 1 }} source={{ uri: food.image }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
            {food?.name}
          </Text>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, marginTop: -4, textAlign: "justify" }}>
            {food?.nutrition}
          </Text>
        </View>
      </View>
      <View style={{ height: 2, backgroundColor: "rgb(203 213 225)", marginVertical: 20 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {status(food.permissions[2].permission)}
            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[2].name}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {status(food.permissions[3].permission)}
            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[3].name}</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {status(food.permissions[0].permission)}
            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[0].name}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {status(food.permissions[1].permission)}
            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[1].name}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
