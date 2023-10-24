import { Image, Pressable, Text, ToastAndroid, View } from "react-native"
import { FontAwesome5, MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}



export default function NutritionDailyCard({ data, color }) {
  const { Protein_g, Karbohidrat_g, Serat_g, Lemak_Total } = data.details
  const navigation = useNavigation()
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("NutritionDetail", { data })
        console.log("clicked")
      }}
      style={{
        backgroundColor: "white",
        padding: 15,
        gap: 10,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: color ? color : "rgb(203 213 225)",
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
            {formatDate(data.date)}
          </Text>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>{data.input.toLowerCase()}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
          <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: "rgb(239 68 68)",
                width: "100%",
                height: Protein_g.percentage > 100 ? "100%" : Protein_g.percentage + "%",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{Protein_g.value} g</Text>
            <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Protein</Text>
          </View>
        </View>
        <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
          <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: "rgb(139 92 246)",
                width: "100%",
                height: Karbohidrat_g.percentage > 100 ? "100%" : Karbohidrat_g.percentage + "%",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{Karbohidrat_g.value} g</Text>
            <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Karbo</Text>
          </View>
        </View>
        <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
          <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: "rgb(16 185 129)",
                width: "100%",
                height: Serat_g.percentage > 100 ? "100%" : Serat_g.percentage + "%",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{Serat_g.value} g</Text>
            <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Serat</Text>
          </View>
        </View>
        <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
          <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: "rgb(250 204 21)",
                width: "100%",
                height: Lemak_Total.percentage > 100 ? "100%" : Lemak_Total.percentage + "%",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{Lemak_Total.value} g</Text>
            <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Lemak</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
