import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutScreen({ children }) {
    return (
        <SafeAreaView style={
            {
                flex: 1,
                flexDirection: 'column',
            }
        }>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </SafeAreaView>
    )
}