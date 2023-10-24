import { Alert, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"

export default function RegisterScreen() {
  const [username, setUsername] = useState("abcdefghi")
  const [email, setEmail] = useState("abcdefghi@abcdefghi.com")
  const [password, setPassword] = useState("abcdefghi")

 

  const handleRegister = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isEmail = emailRegex.test(email);

    if (username.length <= 5) {
      Alert.alert("Warning", "Username must be at least 5 characters long", [{ text: "OK", onPress: () => console.log("Tombol OK ditekan") }], {
        cancelable: false,
      })
    } else if (password.length <= 5) {
      Alert.alert("Warning", "Password must be at least 5 characters long", [{ text: "OK", onPress: () => console.log("Tombol OK ditekan") }], {
        cancelable: false,
      })
    } else if (!isEmail) {
      Alert.alert("Warning", "Invalid email format", [{ text: "OK", onPress: () => console.log("Tombol OK ditekan") }], {
        cancelable: false,
      })
    }  else {
      navigation.navigate("CreateProfile", { data: { username, email, password } })
    }
  }

  const navigation = useNavigation()
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ backgroundColor: "white", flex: 1, padding: 30 }}>
          <View>
            <Pressable onPress={() => navigation.navigate("Welcome")} style={{ marginTop: 30, width: 40, paddingVertical: 5 }}>
              <AntDesign name="arrowleft" size={25} color="black" />
            </Pressable>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 30 }}>Create new</Text>
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 30 }}>account!</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 18 }}>Username</Text>
              <TextInput
                value={username}
                onChangeText={(username) => setUsername(username)}
                placeholder={"Enter your username"}
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
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 18 }}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(email) => setEmail(email)}
                placeholder={"name@email.com"}
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
            <Pressable style={{ backgroundColor: "black", marginTop: 50, padding: 12, borderRadius: 15 }} onPress={() => handleRegister()}>
              <Text style={{ textAlign: "center", fontFamily: "Poppins-SemiBold", color: "white", fontSize: 16 }}>Sign Up!</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
