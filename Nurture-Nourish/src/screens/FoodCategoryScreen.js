import { Image, Pressable, ScrollView, Text, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import FoodCategoryCard from "../components/FoodCategoryCard"
import BottomComponent from "../components/BottomComponent"

export default function FoodCategoryScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>Kategori</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>Makanan & Nutrisi</Text>
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
        <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
          <FoodCategoryCard name={"Biji-bijian"} type={"whole_grains"} imgUrl={require("../images/seeds.png")} />
          <FoodCategoryCard name={"Sayuran"} type={"vegetables_and_fungus"} imgUrl={require("../images/fiber.png")} />
          <FoodCategoryCard name={"Kacang-kacangan"} type={"nuts"} imgUrl={require("../images/nuts.png")} />
          <FoodCategoryCard name={"Olahan Susu"} type={"milk_base"} imgUrl={require("../images/cheese.png")} />
          <FoodCategoryCard name={"Bumbu"} type={"seasonings"} imgUrl={require("../images/spice.png")} />
          <FoodCategoryCard name={"Olahan"} type={"processed_food"} imgUrl={require("../images/sausage.png")} />
          <FoodCategoryCard name={"Herbal"} type={"supplements"} imgUrl={require("../images/herbal.png")} />
          <FoodCategoryCard name={"Buah"} type={"fruits"} imgUrl={require("../images/fruit.png")} />
          <FoodCategoryCard name={"Cemilan"} type={"snacks"} imgUrl={require("../images/tacos.png")} />
          <FoodCategoryCard name={"Laut"} type={"seafood"} imgUrl={require("../images/seafood.png")} />
          <FoodCategoryCard name={"Daging"} type={"meat"} imgUrl={require("../images/meat.png")} />
          <FoodCategoryCard name={"Minuman"} type={"beverages"} imgUrl={require("../images/drink.png")} />
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
