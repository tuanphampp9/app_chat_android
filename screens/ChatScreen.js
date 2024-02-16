import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import backgroundImage from '../assets/images/droplet.jpeg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors'
import { useRoute, useNavigation } from '@react-navigation/native';
import PageContainer from '../components/PageContainer'
import Bubble from '../components/Bubble'
import { createChat } from '../utils/actions/chatActions'
const ChatScreen = () => {
    const [messageText, setMessageText] = useState('');
    const route = useRoute();
    const { accountData, newChatData, isFriend } = route.params;
    console.log('is friend:', isFriend);
    const [chatId, setChatId] = useState(route.params?.chatId)
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: accountData.fullName
        })
    }, [])
    const sendMessage = useCallback(async () => {
        try {
            let id = chatId;
            if (!id) {
                //No chat Id. Create the chat
                const id = await createChat(newChatData[1], {
                    users: newChatData
                })
                setChatId(id);
            }
        } catch (error) {

        }
        setMessageText("")
    }, [messageText, chatId])
    return (
        <SafeAreaView
            edges={['right', 'left', 'bottom']}
            style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.background} >
                <PageContainer style={{ backgroundColor: 'transparent' }}>
                    {
                        !chatId && <Bubble
                            text={isFriend ? "Tin nhắn mới" : "Hai bạn chưa phải là bạn bè! Vui lòng kết bạn để nhắn tin"}
                            type="system" />
                    }
                </PageContainer>
            </ImageBackground>
            {isFriend && <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => console.log('pressed')}>
                    <Ionicons name="add" size={24} color={colors.blue} />
                </TouchableOpacity>
                <TextInput style={styles.textBox}
                    value={messageText}
                    onChangeText={(text) => setMessageText(text)}
                    onSubmitEditing={sendMessage}//enter/v
                />
                {messageText === "" ? <TouchableOpacity onPress={() => console.log('camera')}>
                    <Ionicons name="camera" size={24} color={colors.blue} />
                </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons name="send" size={24} color={colors.blue} style={{
                            transform: [{ rotate: '-45deg' }]
                        }} />
                    </TouchableOpacity>
                }
            </View>}
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    background: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    textBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.lightGrey,
        marginHorizontal: 15,
        paddingHorizontal: 12
    }
})