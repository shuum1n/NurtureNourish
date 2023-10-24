import { Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"

import { useDispatch } from "react-redux"
import { login } from "../stores/actionCreator"

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    dispatch(login(username, password)).then(() => navigation.navigate("Dashboard"))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ backgroundColor: "white", flex: 1, padding: 30 }}>
        <Pressable onPress={() => navigation.navigate("Welcome")} style={{ marginTop: 30, width: 40, paddingVertical: 5 }}>
          <AntDesign name="arrowleft" size={25} color="black" />
        </Pressable>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 30 }}>Welcome</Text>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 30 }}>back!</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 18 }}>Username</Text>
          <TextInput
            value={username}
            onChangeText={(userName) => setUsername(userName)}
            placeholder={"Input your username"}
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              fontSize: 16,
              fontFamily: "Poppins-Regular",
              borderBottomWidth: 1,
              borderBottomColor: "rgb(203 213 225)",
            }}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 18 }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder={"Enter your password"}
            secureTextEntry={true}
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              fontSize: 16,
              fontFamily: "Poppins-Regular",
              borderBottomWidth: 1,
              borderBottomColor: "rgb(203 213 225)",
            }}
          />
        </View>
        <Pressable style={{ backgroundColor: "black", marginTop: 50, padding: 12, borderRadius: 15 }} onPress={() => handleLogin()}>
          <Text style={{ textAlign: "center", fontFamily: "Poppins-SemiBold", color: "white", fontSize: 16 }}>Sign In!</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  )
}
