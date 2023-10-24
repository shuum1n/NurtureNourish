import { useNavigation } from "@react-navigation/native"
import { Image, Pressable, Text, View } from "react-native"

export default function RecipeSaveCard({ recipe, status }) {
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.navigate("RecipeDetail", { recipe, status })} style={{ marginBottom: 20 }}>
      <View
        style={{
          borderRadius: 15,
          borderWidth: 1,
          height: 200,
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
          {recipe?.title}
        </Text>
      </View>
    </Pressable>
  )
}
