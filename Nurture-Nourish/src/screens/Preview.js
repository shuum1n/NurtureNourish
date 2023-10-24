import { useEffect, useState } from "react"
import { Image, StyleSheet, View, Text } from "react-native"

export default function Preview({ navigation, route }) {
  const { uri } = route.params.data
  const [data, setData] = useState([])

  const recogniseImage = async () => {
    try {
      const form = new FormData()

      form.append("ingredients", {
        uri: uri,
        name: "sadsadad",
        type: "image/jpg",
      })

      let res = await fetch("http://192.168.43.122:3000/recipes/recognise", {
        method: "post",
        body: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (!res.ok) throw await res.json()

      const result = await res.json()
      console.log("📌 result: ", result)

      setData(result.AITags)
    } catch (error) {
      console.log("error upload", error)
    }
  }

  useEffect(() => {
    recogniseImage()
  }, [])

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={{ height: 200, width: 200 }} />

      {data.map((x) => (
        <Text style={{ fontSize: 30, marginTop: 5 }}>{x.name}</Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
})
