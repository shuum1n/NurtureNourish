import { Text, View } from 'react-native'

export default function HeaderComponent({ leftContent, centerContent, rightContent }) {
    return (
        <View style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: "center",
            height: 80,
        }}>
            <View>
                {leftContent}
            </View>
            <View>
                {centerContent}
            </View>
            <View style={{ backgroundColor: "rgb(248 250 252)", padding: 5, borderRadius: 14, flexDirection: "row", alignItems: "center", gap: 10 }}>
                {rightContent}
            </View>
        </View>
    )
}
