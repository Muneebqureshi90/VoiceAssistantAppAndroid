import {Dimensions, Image, Platform, SafeAreaView, Text, View} from "react-native";
import React, {useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from "@react-navigation/native";
import chatgptIcon from '../../../assets/images/chatgpt-icon.png';
import DallIcon from '../../../assets/images/DALL-E_jdpanj.png';
import SmartAiIcon from '../../../assets/images/deep-learning.png';
import {fontSize} from "nativewind/dist/tailwind/native/font-size";

const ios = Platform.OS === 'ios';
var {width, height} = Dimensions.get('window');
const Features = () => {
    return (
        <View style={{height: hp(60)}} className={'space-y-4'}>
            <Text style={{fontSize: wp(6.5)}} className={'font-semibold text-gray-700 '}>Features</Text>
            <View className={'bg-emerald-400 p-4 rounded-2xl space-y-2'}>
                <View className={' flex-row items-center space-x-1'}>
                    <Image source={chatgptIcon} style={{height: hp(5), width: hp(5)}}/>
                    <Text style={{fontSize: (wp(4.8))}} className={'font-semibold text-gray-700 '}>ChatGPT</Text>
                </View>
                <Text style={{fontSize: (wp(3.8))}} className={'text-gray-700 font-medium'}>ChatGPT an AI language model
                    designed to assist and provide information on a wide range of topics.</Text>
            </View>
            <View className={'bg-purple-200 p-4 rounded-2xl space-y-2'}>
                <View className={' flex-row items-center space-x-1'}>
                    <Image source={DallIcon} style={{height: hp(5), width: hp(5)}}/>
                    <Text style={{fontSize: (wp(4.8))}} className={'font-semibold text-gray-700 '}>DALL-E</Text>
                </View>
                <Text style={{fontSize: (wp(3.8))}} className={'text-gray-700 font-medium'}>DALL-E is an AI model
                    developed by OpenAI capable of generating diverse and creative images from textual
                    descriptions.</Text>
            </View>
            <View className={'bg-cyan-200 p-4 rounded-2xl space-y-2'}>
                <View className={' flex-row items-center space-x-1'}>
                    <Image source={SmartAiIcon} style={{height: hp(5), width: hp(5)}}/>
                    <Text style={{fontSize: (wp(4.8))}} className={'font-semibold text-gray-700 '}>Smart AI</Text>
                </View>
                <Text style={{fontSize: (wp(3.8))}} className={'text-gray-700 font-medium'}>"Smart AI" typically refers
                    to artificial intelligence systems with advanced capabilities for learning.</Text>
            </View>
        </View>
    )
}
export default Features;
