import { useState } from "react"
import { Text, Button, StyleSheet, View } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"

export default function Test({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [date, setDate] = useState()

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date)
    setDate(date)
    hideDatePicker()
  }

  return (
    <View style={styles.container}>
      <Text>Date: {JSON.stringify(date)}</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} />
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
