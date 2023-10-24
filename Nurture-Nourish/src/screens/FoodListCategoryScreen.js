import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import FoodCategoryCard from "../components/FoodCategoryCard"
import BottomComponent from "../components/BottomComponent"
import FoodCard from "../components/FoodCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFoodByKey } from "../stores/actionCreator"
import Loading from "../components/Loading"

export default function FoodListCategoryScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState([])
  const [loading, setLoading] = useState(true)

  const foods = useSelector((state) => state.foods)
  const { name, imgUrl, type } = route.params

  useEffect(() => {
    setLoading(true)
    dispatch(getFoodByKey(type)).then(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!search) {
      setFilter([...foods])
    } else {
      const filterData = foods.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
      setFilter(filterData)
    }
  }, [search, foods])

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
          centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>{name}</Text>}
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
        <View style={{ marginTop: 10, paddingHorizontal: 25, paddingBottom: 10, borderBottomWidth: 1, borderColor: "rgb(203 213 225)" }}>
          <TextInput
            value={search}
            onChangeText={(search) => setSearch(search)}
            placeholder={"Cari makanan"}
            style={{ backgroundColor: "white", borderWidth: 2, borderColor: "rgb(203 213 225)", padding: 10, borderRadius: 15 }}
          />
        </View>
        <ScrollView style={{ paddingHorizontal: 25 }}>
          <View style={{ marginTop: 10, gap: 10 }}>
            {filter.map((item, index) => (
              <FoodCard key={index} food={item} />
            ))}
          </View>

          {/* Margin Bottom */}
          <View style={{ height: 35 }} />
        </ScrollView>
        <BottomComponent />
      </View>
    )
  }
}
