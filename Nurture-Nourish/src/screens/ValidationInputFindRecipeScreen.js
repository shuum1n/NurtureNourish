import { Button, Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loading from "../components/Loading"
import axios from "axios"

export default function ValidationInputFindRecipeScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const [fields, setFields] = useState([{ food: "", value: "" }])

  const { uri } = route.params.data
  const [data, setData] = useState({
    fileId: "65156c6f88c257da33d046d9",
    name: "ingredients_2YhbkECbw.jpg",
    size: 18216,
    versionInfo: {
      id: "65156c6f88c257da33d046d9",
      name: "Version 1",
    },
    filePath: "/ingredients_2YhbkECbw.jpg",
    url: "https://ik.imagekit.io/nfpxx9byw/ingredients_2YhbkECbw.jpg",
    fileType: "image",
    height: 506,
    width: 900,
    thumbnailUrl: "https://ik.imagekit.io/nfpxx9byw/tr:n-ik_ml_thumbnail/ingredients_2YhbkECbw.jpg",
    AITags: [
      {
        name: "Tomato",
        confidence: 97.9,
        source: "aws-auto-tagging",
      },
      {
        name: "Orange",
        confidence: 97.9,
        source: "aws-auto-tagging",
      },
      {
        name: "Fruit",
        confidence: 97.9,
        source: "aws-auto-tagging",
      },
    ],
    extensionStatus: {
      "aws-auto-tagging": "success",
    },
  })
  const [loading, setLoading] = useState(true)

  const addField = () => {
    setFields([...fields, { food: "", value: "" }])
  }

  const removeField = () => {
    if (fields.length > 1) {
      const newFields = [...fields]
      newFields.pop()
      setFields(newFields)
    }
  }

  const recogniseImage = async () => {
    try {
      const form = new FormData()
      const token = await AsyncStorage.getItem("access_token")

      form.append("ingredients", {
        uri: uri,
        name: "sadsadad",
        type: "image/jpg",
      })

      let { data } = await axios.post("http://192.168.100.87:3000/recipes/recognise", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: token,
        },
      })

      setData(data)
    } catch (error) {
      console.log("error upload", error)
    }
  }

  const handleSubmit = () => {
    const ingredients = fields.map((x) => x.value)
    navigation.navigate("RecipeRecommendation", { ingredients })
  }

  useEffect(() => {
    setLoading(true)

    // setTimeout(() => {
    //   recogniseImage()
    // }, 3000)

    // const test = {
    //   fileId: "65156c6f88c257da33d046d9",
    //   name: "ingredients_2YhbkECbw.jpg",
    //   size: 18216,
    //   versionInfo: {
    //     id: "65156c6f88c257da33d046d9",
    //     name: "Version 1",
    //   },
    //   filePath: "/ingredients_2YhbkECbw.jpg",
    //   url: "https://ik.imagekit.io/nfpxx9byw/ingredients_2YhbkECbw.jpg",
    //   fileType: "image",
    //   height: 506,
    //   width: 900,
    //   thumbnailUrl: "https://ik.imagekit.io/nfpxx9byw/tr:n-ik_ml_thumbnail/ingredients_2YhbkECbw.jpg",
    //   AITags: [
    //     {
    //       name: "Cartoon",
    //       confidence: 97.9,
    //       source: "aws-auto-tagging",
    //     },
    //   ],
    //   extensionStatus: {
    //     "aws-auto-tagging": "success",
    //   },
    // }
    // setData(test)
    const objectDetection = data?.AITags?.map((x) => ({ food: x.name, value: x.name }))
    setFields(objectDetection)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

  // useEffect(() => {
  //   if (data.AITags) {
  //     const objectDetection = data?.AITags?.map((x) => ({ food: x.name, value: x.name }))
  //     setFields(objectDetection)
  //     setLoading(false)
  //   }
  // }, [data])

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
          centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Bahan Makanan</Text>}
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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1, paddingTop: 10, marginBottom: -5, fontSize: 16, fontFamily: "Poppins-SemiBold", borderRadius: 13 }}>
                Nama Bahan
              </Text>
            </View>
            {fields.map((field, index) => (
              <View key={index} style={{ gap: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    value={field.food}
                    onChangeText={(text) => {
                      const newFields = [...fields]
                      newFields[index].food = text
                      newFields[index].value = text
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

                  <Pressable
                    onPress={() => {
                      const newData = [...fields]
                      newData.splice(index, 1)
                      setFields(newData)
                    }}
                  >
                    <MaterialCommunityIcons name="minus-box" size={50} color="black" />
                  </Pressable>
                </View>
              </View>
            ))}
            <View style={{ flexDirection: "row", marginTop: 10, gap: 5, alignItems: "center" }}>
              <Pressable style={{ flex: 1, padding: 10, marginRight: 5, backgroundColor: "black", borderRadius: 12 }} onPress={() => handleSubmit()}>
                <Text style={{ textAlign: "center", fontFamily: "Poppins-SemiBold", color: "white", marginBottom: -3, fontSize: 16 }}>Submit</Text>
              </Pressable>
              {/* <Pressable onPress={removeField}>
                <MaterialCommunityIcons name="minus-box" size={50} color="black" />
              </Pressable> */}
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
