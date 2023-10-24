import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, Text, View } from 'react-native'

export default function WelcomeScreen() {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 30, paddingVertical: 50 }}>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "center" }}>
                <Image style={{ width: '100%', height: undefined, aspectRatio: 1 }} source={require('../images/logo.png')} />
            </View>
            <View style={{ marginTop: 50 }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 18 }}>
                    Supporting healthier pregnancies with essential nutrition.
                </Text>
            </View>
            <Pressable style={{ backgroundColor: 'black', marginTop: 50, padding: 12, borderRadius: 15 }} onPress={() => { navigation.navigate('Login') }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', color: "white", fontSize: 16 }}>
                    Go to Sign In
                </Text>
            </Pressable>
            <Pressable style={{ backgroundColor: 'rgb(248 250 252)', marginTop: 10, padding: 12, borderRadius: 15 }} onPress={() => { navigation.navigate('Register') }}>
                <View style={{ justifyContent: "center", flexDirection: 'row' }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', marginRight: 5, fontSize: 16 }}>
                        No account yet?
                    </Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>
                        Sign Up
                    </Text>
                </View>
            </Pressable>
        </View >
    )
}
