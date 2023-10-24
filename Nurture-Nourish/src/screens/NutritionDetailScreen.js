import { Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import NutritionSubDetail from "../components/NutritionSubDetail"
import BottomComponent from "../components/BottomComponent"

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

export default function NutritionDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  const {
    Protein_g,
    Karbohidrat_g,
    Serat_g,
    Lemak_Total,
    Omega_3,
    Omega_6,
    Air_ml,
    Vitamin_A_re,
    Vitamin_C_mcg,
    Folat,
    Kolin,
    Vitamin_B5,
    Vitamin_B3,
    Vitamin_B6,
    Vitamin_B1,
  } = route.params.data.details

  function colorPercentage(percentage) {
    // console.log(percentage)
    if (Number(percentage) >= 60) {
      return "green"
    } else {
      return "orange"
    }
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>
        }
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Detail Nutrisi</Text>}
        rightContent={
          <Pressable
            onPress={() => {
              navigation.navigate("ProfileDetail")
              console.log("clicked")
            }}
          >
            <FontAwesome5 name="user-circle" size={28} color="black" />
          </Pressable>
        }
      />
      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              gap: 10,
              borderRadius: 20,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: "rgb(203 213 225)",
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ alignItems: "center" }}>
                {/* <Entypo name="squared-cross" style={{ color: "red" }} size={39} color="black" /> */}
                {/* <FontAwesome name="check-square-o" style={{ color: "green" }} size={40} color="black" /> */}
                <Image style={{ width: 40, height: 40 }} source={require('../images/nutritions.png')} />
              </View>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -5 }}>
                  {formatDate(route.params.data.date)}
                </Text>
                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>{route.params.data.input}</Text>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "rgb(203 213 225)", height: 2, marginBottom: 10, marginHorizontal: -15 }} />
            <View
              style={{
                gap: 15,
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <NutritionSubDetail
                name={"Protein"}
                percentage={Protein_g.percentage > 100 ? "100%" : Protein_g.percentage + "%"}
                value={Protein_g.percentage + "%"}
                color={colorPercentage(Protein_g.percentage)}
                imgUrl={require("../images/protein.png")}
                info={Protein_g.information}
              />
              <NutritionSubDetail
                name={"Karbohidrat"}
                percentage={Karbohidrat_g.percentage > 100 ? "100%" : Karbohidrat_g.percentage + "%"}
                value={Karbohidrat_g.percentage + "%"}
                color={colorPercentage(Karbohidrat_g.percentage)}
                imgUrl={require("../images/carbs.png")}
                info={Karbohidrat_g.information}
              />
              <NutritionSubDetail
                name={"Serat"}
                percentage={Serat_g.percentage > 100 ? "100%" : Serat_g.percentage + "%"}
                value={Serat_g.percentage + "%"}
                color={colorPercentage(Serat_g.percentage)}
                imgUrl={require("../images/fiber.png")}
                info={Serat_g.information}
              />
              <NutritionSubDetail
                name={"Lemak"}
                percentage={Lemak_Total.percentage > 100 ? "100%" : Lemak_Total.percentage + "%"}
                value={Lemak_Total.percentage + "%"}
                color={colorPercentage(Lemak_Total.percentage)}
                imgUrl={require("../images/fat.png")}
                info={Lemak_Total.information}
              />
              <NutritionSubDetail
                name={"Omega 3"}
                percentage={Omega_3.percentage > 100 ? "100%" : Omega_3.percentage + "%"}
                value={Omega_3.percentage + "%"}
                color={colorPercentage(Omega_3.percentage)}
                imgUrl={require("../images/omega3.png")}
                info={Omega_3.information}
              />
              <NutritionSubDetail
                name={"Omega 6"}
                percentage={Omega_6.percentage > 100 ? "100%" : Omega_6.percentage + "%"}
                value={Omega_6.percentage + "%"}
                color={colorPercentage(Omega_6.percentage)}
                imgUrl={require("../images/omega6.png")}
                info={Omega_6.information}
              />
              <NutritionSubDetail
                name={"Mineral"}
                percentage={Air_ml.percentage > 100 ? "100%" : Air_ml.percentage + "%"}
                value={Air_ml.percentage + "%"}
                color={colorPercentage(Air_ml.percentage)}
                imgUrl={require("../images/water.png")}
                info={Air_ml.information}
              />
              {/* <NutritionSubDetail
                name={"Vitamin A"}
                percentage={Vitamin_A_re.value > 100 ? "100%" : Vitamin_A_re.value + "%"}
                value={Vitamin_A_re.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin C"}
                percentage={Vitamin_C_mcg.value > 100 ? "100%" : Vitamin_C_mcg.value + "%"}
                value={Vitamin_C_mcg.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Folat"}
                percentage={Folat.value > 100 ? "100%" : Folat.value + "%"}
                value={Folat.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Kolin"}
                percentage={Kolin.value > 100 ? "100%" : Kolin.value + "%"}
                value={Kolin.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B1"}
                percentage={Vitamin_B1.value > 100 ? "100%" : Vitamin_B1.value + "%"}
                value={Vitamin_B1.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B3"}
                percentage={Vitamin_B3.value > 100 ? "100%" : Vitamin_B3.value + "%"}
                value={Vitamin_B3.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B5"}
                percentage={Vitamin_B5.value > 100 ? "100%" : Vitamin_B5.value + "%"}
                value={Vitamin_B5.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B6"}
                percentage={Vitamin_B6.value > 100 ? "100%" : Vitamin_B6.value + "%"}
                value={Vitamin_B6.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              /> */}
            </View>
          </View>
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 30 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
