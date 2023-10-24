import { Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import RecipeSaveCard from "../components/RecipeSaveCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipes } from "../stores/actionCreator"
import Loading from "../components/Loading"

export default function RecipeRecommendationScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  // const recipes = useSelector((state) => state.recipes)
  const recipes = [
    {
      title: "Bakwan Sayur",
      description:
        "Bakwan Sayur is a popular Indonesian dish made from a mix of vegetables and flour. It is a tasty and nutritious snack for pregnant women.",
      ingredients: [
        "3 tomatoes",
        "2 oranges",
        "1 cup flour",
        "1/2 tsp baking powder",
        "1/2 tsp salt",
        "1/2 tsp pepper",
        "1/2 cup water",
        "Oil for frying",
      ],
      instructions: [
        "Slice the tomatoes into thin slices.",
        "Squeeze the juice from the oranges.",
        "In a bowl, mix the flour, baking powder, salt, and pepper.",
        "Add the water and orange juice to the flour mixture, and whisk until smooth.",
        "Dip the tomato slices into the batter, then deep fry them in oil until golden brown.",
        "Serve hot as a snack or appetizer.",
      ],
      nutrition:
        "Bakwan Sayur provides a good amount of vitamins and minerals from the vegetables. Tomatoes are rich in vitamin C, while oranges are a great source of vitamin C and folate. The flour provides carbohydrates for energy and the baking powder adds a small amount of calcium.",
      inputIngredients: ["tomat", "jeruk"],
      thumb: "https://1.bp.blogspot.com/-KjE2jCP_CJc/WWKEtnE9TJI/AAAAAAAABwo/-PwQ9yltwOcTUipG2VuCAKUyATEKBNPdQCLcBGAs/s1600/bakwan-3193.jpg",
      youtube: "https://www.youtube.com/watch?v=tVCaK158ar8",
      youtubeThumb: "https://i.ytimg.com/vi/tVCaK158ar8/hqdefault.jpg",
    },
    {
      title: "Gado-Gado",
      description:
        "Gado-Gado is a traditional Indonesian salad dish that is packed with various vegetables and a delicious peanut sauce. It is a nutritious option for pregnant women.",
      ingredients: [
        "3 tomatoes",
        "2 oranges",
        "1 cup boiled vegetables (such as beansprouts, carrots, cabbage)",
        "1 cup tofu, fried and cut into cubes",
        "1 cup tempeh, fried and cut into cubes",
        "1 cup boiled eggs, peeled and halved",
        "1 cup steamed rice",
        "Peanut sauce (made from ground peanuts, garlic, chili, palm sugar, tamarind juice, and water)",
      ],
      instructions: [
        "Slice the tomatoes into wedges.",
        "Arrange the boiled vegetables, tofu, tempeh, boiled eggs, and steamed rice on a plate.",
        "Pour the peanut sauce over the ingredients.",
        "Serve as a salad or main dish.",
      ],
      nutrition:
        "Gado-Gado is a nutritious dish that contains a variety of vegetables, tofu, tempeh, and eggs. Tomatoes and oranges provide vitamin C, while vegetables offer essential vitamins and minerals. Tofu and tempeh are good sources of plant-based protein, and eggs provide additional protein and other nutrients.",
      inputIngredients: ["tomat", "jeruk"],
      thumb: "https://www.wandercooks.com/wp-content/uploads/2020/11/gado-gado-salad-with-peanut-sauce-ft-1.jpg",
      youtube: "https://www.youtube.com/watch?v=Jm1ThTdVgwo",
      youtubeThumb: "https://i.ytimg.com/vi/Jm1ThTdVgwo/hqdefault.jpg",
    },
    {
      title: "Sayur Bening Bayam",
      description:
        "Sayur Bening Bayam is a simple Indonesian clear spinach soup that is light and nutritious. It can be enjoyed as a side dish or a light meal during pregnancy.",
      ingredients: [
        "3 tomatoes",
        "2 oranges",
        "1 bunch spinach, washed and trimmed",
        "2 cups vegetable broth",
        "2 cloves garlic, minced",
        "Salt and pepper to taste",
        "1 tsp coconut oil",
      ],
      instructions: [
        "Slice the tomatoes into small pieces.",
        "Heat coconut oil in a pot and sautÃ© the minced garlic until fragrant.",
        "Add the tomatoes and cook until they soften.",
        "Pour in the vegetable broth and bring to a boil.",
        "Add the spinach, salt, and pepper, and cook until the spinach wilts.",
        "Serve hot as a soup.",
      ],
      nutrition:
        "Sayur Bening Bayam is a nutritious soup that combines the goodness of spinach, tomatoes, and vegetable broth. Spinach is a rich source of iron, calcium, and vitamins A and C. Tomatoes and oranges provide additional vitamins and minerals. The soup is low in calories and fat, making it a healthy choice for pregnant women.",
      inputIngredients: ["tomat", "jeruk"],
      thumb:
        "https://cdn.yummy.co.id/content-images/images/20200508/HZ5sbHlHWh95ivBzKufzyV9gUMV9e6mm-31353838393132393536d41d8cd98f00b204e9800998ecf8427e_800x800.jpg",
      youtube: "https://www.youtube.com/watch?v=6hlNjngay2k",
      youtubeThumb: "https://i.ytimg.com/vi/6hlNjngay2k/hqdefault.jpg",
    },
  ]
  const [loading, setLoading] = useState(true)
  const { ingredients } = route.params

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
    // dispatch(getRecipes(ingredients)).then(() => setLoading(false))
  }, [])

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
          centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Rekomendasi Resep</Text>}
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
            {recipes.map((item, index) => (
              <RecipeSaveCard recipe={item} key={index} status="unsave" />
            ))}
          </View>

          {/* Margin Bottom */}
          <View style={{ height: 15 }} />
        </ScrollView>
        <BottomComponent />
      </View>
    )
  }
}
