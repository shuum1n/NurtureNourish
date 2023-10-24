import { Alert, Button, Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import { useDispatch } from "react-redux"
import { addNutritions, getDaily } from "../stores/actionCreator"
import Loading from "../components/Loading"
import DateTimePickerModal from "react-native-modal-datetime-picker"

export default function AddNutritionScreen() {
  const navigation = useNavigation()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [date, setDate] = useState()
  const [fields, setFields] = useState([{ name: "", weight: "" }])

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const addField = () => {
    setFields([...fields, { name: "", weight: "" }])
  }

  const removeField = () => {
    if (fields.length > 1) {
      const newFields = [...fields]
      newFields.pop()
      setFields(newFields)
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setDate(date)
    hideDatePicker()
  }

  const handleSubmit = async () => {
    setLoading(true)
    if (!date) {
      Alert.alert("Warning", "Date is require", [{ text: "OK", onPress: () => setLoading(false) }], {
        cancelable: false,
      })
    } else {
      const newFields = []
      fields.forEach((x) => (x.name && x.weight ? newFields.push(x) : ""))

      dispatch(addNutritions(newFields, date)).then(() => {
        setLoading(false)
        dispatch(getDaily()).then(() => {
          navigation.navigate("NutritionList", { status: Math.random() })
        })
      })
    }
  }

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <HeaderComponent
          leftContent={
            <Pressable onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" size={30} color="black" />
            </Pressable>
          }
          centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Tambah Nutrisi Harian</Text>}
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
          <View style={{ marginTop: 10, gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ flex: 1, paddingTop: 10, marginBottom: -5, fontSize: 16, fontFamily: "Poppins-SemiBold", borderRadius: 13 }}>
                Makanan
              </Text>
              <Text style={{ width: 80, paddingTop: 10, marginBottom: -5, fontSize: 16, fontFamily: "Poppins-SemiBold", borderRadius: 13 }}>
                Value
              </Text>
            </View>

            {fields.map((field, index) => (
              <View key={index} style={{ gap: 10 }}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TextInput
                    value={field.name}
                    onChangeText={(text) => {
                      const newFields = [...fields]
                      newFields[index].name = text
                      setFields(newFields)
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      flex: 1,
                      paddingTop: 10,
                      paddingHorizontal: 10,
                      paddingBottom: 6,
                      fontSize: 16,
                      fontFamily: "Poppins-Medium",
                      borderRadius: 13,
                    }}
                  />
                  <TextInput
                    value={field.weight}
                    onChangeText={(text) => {
                      const newFields = [...fields]
                      newFields[index].weight = text
                      setFields(newFields)
                    }}
                    keyboardType="numeric"
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      width: 80,
                      paddingTop: 10,
                      paddingHorizontal: 10,
                      paddingBottom: 6,
                      fontSize: 16,
                      fontFamily: "Poppins-Medium",
                      borderRadius: 13,
                    }}
                    placeholder={"gr"}
                  />
                </View>
              </View>
            ))}

            <Pressable
              onPress={showDatePicker}
              style={{ flex: 1, padding: 10, marginRight: 5, marginTop: 10, backgroundColor: "black", borderRadius: 12 }}
            >
              <Text style={{ textAlign: "center", fontFamily: "Poppins-SemiBold", color: "white", marginBottom: -3, fontSize: 16 }}>Select Date</Text>
            </Pressable>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
            <View style={{ flexDirection: "row", marginTop: 5, gap: 5, alignItems: "center" }}>
              <Pressable style={{ flex: 1, padding: 10, marginRight: 5, backgroundColor: "black", borderRadius: 12 }} onPress={() => handleSubmit()}>
                <Text style={{ textAlign: "center", fontFamily: "Poppins-SemiBold", color: "white", marginBottom: -3, fontSize: 16 }}>Submit</Text>
              </Pressable>
              <Pressable onPress={removeField}>
                <MaterialCommunityIcons name="minus-box" size={50} color="black" />
              </Pressable>
              <Pressable onPress={addField}>
                <MaterialCommunityIcons name="plus-box" size={50} color="black" />
              </Pressable>
            </View>
          </View>

          {/* Margin Bottom */}
          <View style={{ height: 30 }} />
        </ScrollView>
        <BottomComponent />
      </View>
    )
  }
}
