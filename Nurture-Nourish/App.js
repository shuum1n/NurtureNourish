import { Text, View } from "react-native"
import MainStack from "./src/navigator/MainStack"
import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"
import store from "./src/stores"
import { Provider } from "react-redux"

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./src/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./src/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./src/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./src/fonts/Poppins-SemiBold.ttf"),
  })

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  )
}
