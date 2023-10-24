import { Button, StyleSheet, View, Text, ActivityIndicator } from "react-native"

export default function Loading({ navigation }) {
  return (
    <View style={styles.container}>
       <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})
