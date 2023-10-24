import { Button, StyleSheet, View } from "react-native"

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("Chat")} title="Chat" />
      <Button onPress={() => navigation.navigate("Camera")} title="Camera" />
      <Button onPress={() => navigation.navigate("Test")} title="Test" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})
