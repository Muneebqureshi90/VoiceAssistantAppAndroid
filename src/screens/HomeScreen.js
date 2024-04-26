import {Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useState, useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from "@react-navigation/native";
import Features from "../components/home/Features";
import DummyMessage from "../contants/home/DummyMessage";
import Voice from '@react-native-community/voice';
import {botImage} from '../../assets/images/bot.png'
import {abImage} from '../../assets/images/vecteezy_audio-recording-icon-on-transparent-background_19940416.png'
import { Permissions } from 'expo';
const ios = Platform.OS === 'ios';
var {width, height} = Dimensions.get('window');
// Fix typo in import

const HomeScreen = () => {
    // console.log(DummyMessage); // Add this line to check the value of dummyMessage
    // const [messages, setMessages] = useState(dummyMessage);
    const [messages, setMessages] = useState(DummyMessage);
    const [recording, setRecording] = useState(false)
    const [speaking, setSpeaking] = useState(false)

    //  recording
    const startRecording = async () => {
        setRecording(true);
        try {
            if (Voice) {
                await Voice.start('en-GB');
            } else {
                console.error('Voice object is null');
            }
        } catch (error) {
            console.error('Error in recording', error);
        }
    }

    const stopRecording = async () => {

        try {
            await Voice.stop();
            startRecording(false)
        //     fetch Results from ChatGPT
        } catch (error) {
            console.log('Error in recording', error)
        }
    }

    const speechStartHandler = e => {
        console.log('Speak STart')
    }
    const speechEndHandler = e => {
        console.log('Speak End')
        setRecording(false)
    }
    const speechResultsHandler = e => {
        console.log('Speak Result', e)
    }
    const speechErrorHandler = e => {
        console.log('Speak Error', e)
    }

    useEffect(() => {

        const requestAudioPermission = async () => {
            const { status, expires, permissions } = await Permissions.askAsync(
                Permissions.AUDIO_RECORDING
            );            if (status !== "granted") {
                //Permissions not granted. Don't show the start recording button because it will cause problems if it's pressed.
                this.setState({showRecordButton: false});
            } else {
                this.setState({showRecordButton: true});
            }
        };

        requestAudioPermission();

        // voice Handler
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners)
        }
    }, []);
    const handleOnClick = () => {
        setMessages([]);
    }
    const handleOnStop = () => {
        setSpeaking(false);
    }

    return (

        <View className={'flex-1 bg-white'}>
            {/*bot icon*/}
            <SafeAreaView className={`flex-1 flex mx-5 ${ios ? 'mt-10' : 'mt-6'}`}>
                <View className={'flex-row justify-center'}>
                    <Image source={require('../../assets/images/bot.png')}
                           style={{height: hp(15), width: hp(15)}}/>
                </View>

                {/*    messages|| features*/}
                {messages.length > 0 ? (
                    <View className={'space-y-2 flex-1'}>
                        <Text style={{fontSize: wp(5)}} className={'text-gray-700 font-semibold ml-1'}>Assistant</Text>
                        <View style={{height: hp(58)}} className={'bg-neutral-200 p-4 rounded-3xl space-y-2'}>
                            <ScrollView bounces={false} className={'space-y-4'} showsVerticalScrollIndicator={false}>
                                {messages.map((msg, index) => {
                                    if (msg.role === 'assistant') {
                                        if (msg.content.includes('https')) {
                                            // Render AI image
                                            return (
                                                <View key={index} className={'flex-row justify-start'}>
                                                    <View
                                                        className={'flex rounded-2xl p-2 bg-emerald-100 rounded-tl-none'}>
                                                        <Image source={{uri: msg.content}}
                                                               className={'rounded-2xl'}
                                                               resizeMode={"contain"}
                                                               style={{width: wp(60), height: wp(60)}}/>
                                                    </View>
                                                </View>
                                            );
                                        } else {
                                            // Render text
                                            return (
                                                <View key={index}
                                                      style={{width: wp(70)}}
                                                      className={'bg-emerald-100 rounded-xl rounded-tl-none p-2'}>
                                                    <Text>User: {msg.content}</Text>
                                                </View>
                                            );
                                        }
                                    } else {
                                        // Render user input
                                        return (
                                            <View key={index} className={'flex-row justify-end'}>
                                                <View style={{width: wp(70)}}
                                                      className={'bg-white rounded-xl rounded-tr-none p-2'}>
                                                    <Text>User: {msg.content}</Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                })}

                            </ScrollView>

                        </View>
                    </View>
                ) : (
                    <Features/>
                )
                }
            </SafeAreaView>
            {/*    buutons*/}
            <View className={'items-center flex justify-center'}>
                {
                    recording ? (
                        // recoding stop
                        <TouchableOpacity onPress={stopRecording} >
                            <Image
                                source={require('../../assets/images/vecteezy_audio-recording-icon-on-transparent-background_19940416.png')}
                                className={'rounded-2xl'}
                                style={{width: hp(7), height: hp(7)}}/>
                        </TouchableOpacity>
                    ) : (
                        // recoding start
                        <TouchableOpacity onPress={startRecording}>
                            <Image source={require('../../assets/images/microphone.png')} className={'rounded-2xl'}
                                   style={{width: hp(7), height: hp(7)}}/>
                        </TouchableOpacity>
                    )
                }
                {/*clear*/}
                {
                    messages.length > 0 && (
                        <TouchableOpacity onPress={handleOnClick}
                                          className={'bg-neutral-400 rounded-3xl p-2 absolute right-16'}>
                            <Text className={'text-white font-semibold'}>Clear</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    speaking > 0 && (
                        <TouchableOpacity onPress={handleOnStop}
                                          className={'bg-red-400 rounded-3xl p-2 absolute left-16'}>
                            <Text className={'text-white font-semibold'}>Stop</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>

    )
}
export default HomeScreen;
