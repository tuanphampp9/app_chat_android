import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import backgroundImage from '../assets/images/droplet.jpeg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors'
import { useRoute, useNavigation } from '@react-navigation/native';
import PageContainer from '../components/PageContainer'
import Bubble from '../components/Bubble'
import { createChat, sendTextMessage } from '../utils/actions/chatActions'
import { useSelector } from 'react-redux'
const ChatScreen = () => {
    const [messageText, setMessageText] = useState('');
    const [errorBannerText, setErrorBannerText] = useState('');
    const [chatUsers, setChatUsers] = useState([]);
    const route = useRoute();
    const [chatId, setChatId] = useState(route.params?.chatId);
    const isOnline = route.params?.isOnline ?? false;
    console.log("🚀 ~ file: ChatScreen.js:20 ~ ChatScreen ~ isOnline:", isOnline);
    const userLogin = useSelector((state) => state.auth.userData)
    const chatMessages = useSelector((state) => {
        if (!chatId) return [];
        const chatMessagesData = state.messages.messagesData[chatId];
        if (!chatMessagesData) return [];

        const messageList = [];
        for (const key in chatMessagesData) {
            const message = chatMessagesData[key];
            messageList.push({
                ...message,
                key
            });
        }
        return messageList;
    });

    //newChat data là các userId của 2 người chat với nhau
    const { accountData, newChatData, isFriend } = route.params;
    const userChats = useSelector(state => state.chats.chatsData);
    const chatData = (chatId && userChats[chatId]) || newChatData;

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <View>
                <Text style={{ fontFamily: 'medium', fontSize: 14 }}>{accountData.fullName}</Text>
                <Text style={{ fontFamily: 'regular', color: colors.statusOnline, fontSize: 12 }}>{isOnline ? 'Đang hoạt động' : 'Chưa hoạt động'}</Text>
            </View>
        })
        setChatUsers(chatData.users)
    }, [chatUsers])
    console.log("🚀 ~ file: ChatScreen.js:50 ~ ChatScreen ~ chatUsers:", chatUsers);

    const sendMessage = useCallback(async () => {
        try {
            let id = chatId;
            if (!id) {
                //No chat Id. Create the chat
                //newChatData.users[1] là user đang loggin
                const id = await createChat(newChatData.users[1], {
                    users: newChatData.users
                })
                if (id) {//tạo chat thành công thì tạo message
                    await sendTextMessage(id, userLogin?.userId, messageText)
                    setChatId(id);
                }
            } else {
                //có chatId rồi thì tạo message luôn
                await sendTextMessage(chatId, userLogin?.userId, messageText)
            }
            setErrorBannerText('');
        } catch (error) {
            console.log('e', error)
            //hiện khoảng 4s thì mất
            setErrorBannerText('Message failed to send');
            setTimeout(() => setErrorBannerText(''), 4000);
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
                    {
                        errorBannerText !== '' && <Bubble text={errorBannerText} type="error" />
                    }
                    {
                        chatId &&
                        <FlatList
                            data={chatMessages}
                            keyExtractor={item => item.key}
                            renderItem={
                                (itemData) => {
                                    const message = itemData.item;
                                    const isOwnMessage = message.sendBy === userLogin?.userId;
                                    const messageType = isOwnMessage ? "myMessage" : "theirMessage";
                                    return <Bubble
                                        type={messageType}
                                        text={message.text}
                                        keyIndex={message.key}
                                        chatId={chatId}
                                        timeSend={message.sendAt}
                                    />
                                }
                            }

                        />
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