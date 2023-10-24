import { Pressable, StyleSheet, Text, View } from "react-native"
import * as TalkRn from "@talkjs/expo"
import HeaderComponent from "../components/HeaderComponent"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"

export default function Chat() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)

  const [me, setMe] = useState({
    id: "123456",
    name: "Rama",
    email: "rama@rama.com",
    photoUrl: "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_avatar_white_tone_icon_159354.png",
    welcomeMessage: "Halo dr. Verdian saya ingin berkonsultasi.",
    role: "default",
  })

  const other = {
    id: "verdianOP",
    name: "dr. Verdian OP",
    email: "verdian@doctor.com",
    photoUrl: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_white_tone_icon_159368.png",
    welcomeMessage: `Hei ${me.email}, ada yang bisa dibantu?`,
    role: "default",
  }

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem("id")
      const email = await AsyncStorage.getItem("email")
      const name = await AsyncStorage.getItem("username")
      setMe((prevMe) => ({
        ...prevMe,
        id: id || prevMe.id,
        name: name || prevMe.name,
        email: email || prevMe.email,
      }))
    }
    fetchUser()
    setLoading(false)
  }, [])

  const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other))
  conversationBuilder.setParticipant(me)
  conversationBuilder.setParticipant(other)

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={styles.container}>
        <HeaderComponent
          leftContent={
            <Pressable onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" size={30} color="black" />
            </Pressable>
          }
          centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Chat Counselor</Text>}
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
        <TalkRn.Session appId="t0qA0gWk" me={me}>
          <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
        </TalkRn.Session>
        {/* Margin Bottom */}
        {/* <View style={{ height: 35 }} /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
})
