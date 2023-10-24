import { Image, Text, View } from 'react-native';

export default function NutritionSubDetail({ name, percentage, value, color, imgUrl, info }) {
    return (
        <View>
            <View style={{ flexDirection: "row", gap: 10 }}>
                <View>
                    <View style={{ borderWidth: 1, padding: 5, borderRadius: 10, borderColor: "rgb(203 213 225)" }}>
                        <Image style={{ width: 35, height: 35 }} source={imgUrl} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 2, marginBottom: 5 }}>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>
                            {name}
                        </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>
                            {value}
                        </Text>
                    </View>
                    <View style={{ width: '100%', height: 6, borderRadius: 15, backgroundColor: 'rgb(226 232 240)', justifyContent: "flex-end" }}>
                        <View style={{ backgroundColor: color, width: percentage, height: '100%', borderRadius: 10 }} />
                    </View>
                    <View style={{ marginLeft: 2, marginTop: 4 }}>
                        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 10 }}>
                            {info}
                        </Text>
                    </View>
                </View>
            </View>
        </View>

    )
}
