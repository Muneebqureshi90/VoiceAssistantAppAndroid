import {Dimensions, Platform, SafeAreaView, View, Text, Image, TouchableOpacity} from "react-native";
import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from "@react-navigation/native";
import navigation from "../navigation";

const ios = Platform.OS === 'ios';
var {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {

    const Navigation=useNavigation();
    const handelOnClick=()=>{
        Navigation.navigate('Home');
    }

    return (
        <SafeAreaView className={ios ? 'mt-10' : 'mt-6 flex flex-1 justify-around bg-white'}>
            <View className={'space-y-4'}>
                <Text style={{fontSize: wp(10)}} className={'text-center  font-bold text-gray-700'}>MindMeld</Text>
                <Text style={{fontSize: wp(4)}} className={'text-center tracking-wider text-gray-600 font-semibold'}>The
                    Future is here,
                    powered by AI.</Text>
            </View>
            <View className={'flex-row justify-center items-center'}>
                <Image source={require('../../assets/images/bot.png')} style={{width: wp(75), height: wp(75)}}/>
            </View>
            <TouchableOpacity className={'bg-cyan-200 mx-5 p-4 rounded-2xl '} onPress={handelOnClick}>
                <Text style={{fontSize: wp(6)}} className={'font-bold text-center text-black '}>Get Started </Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}
export default WelcomeScreen;
