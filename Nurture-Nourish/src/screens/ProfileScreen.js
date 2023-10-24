import { Button, Image, Pressable, ScrollView, Text, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import NutritionDailyCard from "../components/NutritionDailyCard"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDaily } from "../stores/actionCreator"

export default function ProfileScreen() {
  const navigation = useNavigation()
  const [user, setUser] = useState({ username: "", email: "", id: "" })
  const [data, setData] = useState({ Protein_g: 0, Karbohidrat_g: 0, Serat_g: 0, Lemak_Total: 0 })
  const [value, setValue] = useState({ Protein_g: 0, Karbohidrat_g: 0, Serat_g: 0, Lemak_Total: 0 })
  const dispatch = useDispatch()

  const daily = useSelector((state) => state.daily)

  const handleLogout = async () => {
    await AsyncStorage.clear()
    console.log(navigation)
    navigation.navigate("Welcome")
  }

  useEffect(() => {
    const getUser = async () => {
      const id = await AsyncStorage.getItem("id")
      const email = await AsyncStorage.getItem("email")
      const username = await AsyncStorage.getItem("username")
      setUser((prevMe) => ({
        ...prevMe,
        id: id || prevMe.id,
        username: username || prevMe.username,
        email: email || prevMe.email,
      }))
    }
    getUser()
    dispatch(getDaily())
  }, [])

  useEffect(() => {
    if (daily.length > 0) {
      setData({
        Protein_g: daily[daily.length - 1]?.details?.Protein_g?.percentage,
        Karbohidrat_g: daily[daily.length - 1]?.details?.Karbohidrat_g?.percentage,
        Serat_g: daily[daily.length - 1]?.details?.Serat_g?.percentage,
        Lemak_Total: daily[daily.length - 1]?.details?.Lemak_Total?.percentage,
      })
      setValue({
        Protein_g: daily[daily.length - 1]?.details?.Protein_g?.value,
        Karbohidrat_g: daily[daily.length - 1]?.details?.Karbohidrat_g?.value,
        Serat_g: daily[daily.length - 1]?.details?.Serat_g?.value,
        Lemak_Total: daily[daily.length - 1]?.details?.Lemak_Total?.value,
      })
    }
    console.log(data)
  }, [daily])

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>
        }
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Profile</Text>}
        rightContent={<MaterialCommunityIcons name="dots-horizontal-circle-outline" size={31} style={{ margin: -2 }} color="black" />}
      />
      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 150, backgroundColor: "black", borderRadius: 100, height: 150, aspectRatio: 1 }}
            source={{ uri: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_avatar_white_tone_icon_159354.png" }}
          />
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 25, marginTop: 20 }}>{user.username}</Text>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginTop: 2, marginBottom: 20 }}>{user.email}</Text>

          <Pressable onPress={() => handleLogout()}>
            <Text
              style={{
                backgroundColor: "black",
                padding: 10,
                width: 100,
                textAlign: "center",
                color: "white",
                fontSize: 18,
                borderRadius: 30,
                marginBottom: 10,
              }}
            >
              Logout
            </Text>
          </Pressable>
          <View style={{ marginTop: 20 }}>
            <Pressable
              onPress={() => {
                navigation.navigate("NutritionDetail", { data: daily[daily.length - 1] })
                console.log("clicked")
              }}
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
              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>Nutrisi Harian Terkini</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View
                      style={{
                        backgroundColor: "rgb(239 68 68)",
                        width: "100%",
                        height: data?.Protein_g > 100 ? "100%" : data?.Protein_g + "%",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{value?.Protein_g} g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Protein</Text>
                  </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View
                      style={{
                        backgroundColor: "rgb(139 92 246)",
                        width: "100%",
                        height: data?.Karbohidrat_g > 100 ? "100%" : data?.Karbohidrat_g + "%",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{value?.Karbohidrat_g} g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Karbo</Text>
                  </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View
                      style={{
                        backgroundColor: "rgb(16 185 129)",
                        width: "100%",
                        height: data?.Serat_g > 100 ? "100%" : data?.Serat_g + "%",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{value?.Serat_g} g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Serat</Text>
                  </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View
                      style={{
                        backgroundColor: "rgb(250 204 21)",
                        width: "100%",
                        height: data?.Lemak_Total > 100 ? "100%" : data?.Lemak_Total + "%",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>{value?.Lemak_Total} g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Lemak</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
