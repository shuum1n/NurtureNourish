import { Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import NutritionDailyCard from "../components/NutritionDailyCard"
import BottomComponent from "../components/BottomComponent"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { getDaily } from "../stores/actionCreator"
import Loading from "../components/Loading"

export default function NutritionScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  const dipatch = useDispatch()
  const daily = useSelector((state) => state.daily)
  const status = route.params?.status

  useEffect(() => {
    setLoading(true)
    dipatch(getDaily()).then(() => setLoading(false))
  }, [status])

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <HeaderComponent
          leftContent={
            <>
              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>Asupan</Text>
              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>Nutrisi Harian</Text>
            </>
          }
          rightContent={
            <>
              <Pressable onPress={() => navigation.navigate("AddNutrition")}>
                <MaterialIcons name="add-circle-outline" size={32} color="black" />
              </Pressable>
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
            {daily.map((x, i) => (
              i == 0 ?
                <NutritionDailyCard key={x._id} data={x} color={'green'} />
                :
                <NutritionDailyCard key={x._id} data={x} />
            ))}
          </View>

          {/* Margin Bottom */}
          <View style={{ height: 25 }} />
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
            <View
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                paddingHorizontal: 25,
              }}
            >
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 18,
                    padding: 35,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16, marginLeft: 10, marginBottom: 20 }}>Hitung Hari Perkiraan Lahir</Text>
                  <Pressable
                    style={{
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      elevation: 2,
                      backgroundColor: "#2196F3",
                    }}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Poppins-Medium",
                        textAlign: "center",
                        marginBottom: -3,
                      }}
                    >
                      Tutup
                    </Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <BottomComponent />
      </View>
    )
  }
}
