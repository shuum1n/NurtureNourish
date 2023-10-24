import { Pressable, Text, View } from 'react-native'
import { AntDesign, Ionicons, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BottomComponent() {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: "white", padding: 30 }}>
            <View style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: "white",
                position: 'absolute',
                borderRadius: 20,
                bottom: 15,
                left: 25,
                right: 25,
                borderWidth: 2,
                borderColor: "rgb(241 245 249)",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Pressable onPress={() => navigation.navigate('Dashboard')} style={{ alignItems: "center", width: 60 }}>
                        <AntDesign name="home" size={30} color="black" />
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -8 }}>Home</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('FoodCategory')} style={{ alignItems: "center", width: 60 }}>
                        <Ionicons name="fast-food-outline" size={29} color="black" />
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -8 }}>Food</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('NutritionList')} style={{ alignItems: "center", width: 60 }}>
                        <MaterialCommunityIcons name="nutrition" size={30} color="black" />
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -8 }}>Nutrition</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Saved')} style={{ alignItems: "center", width: 60 }}>
                        <Ionicons name="ios-bookmarks-outline" size={29} color="black" />
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -8 }}>Recipes</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Chat')} style={{ alignItems: "center", width: 60 }}>
                        <AntDesign name="message1" size={30} color="black" />
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -8 }}>Chat</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}