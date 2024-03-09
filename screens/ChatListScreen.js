import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButtons from '../components/CustomHeaderButtons'
import colors from '../constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import { getFirebaseApp } from '../utils/firebaseConfig'
import { child, equalTo, getDatabase, onValue, orderByChild, query, ref } from 'firebase/database'
import DataUserItem from '../components/DataUserItem'
import PageContainer from '../components/PageContainer'
import { handleTimeMessage } from '../utils/handleTime'
import PageTitle from '../components/PageTitle'

const ChatListScreen = ({ navigation }) => {
    const [countNoti, setCountNoti] = useState(0);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.auth.userData)
    const storedUsers = useSelector((state) => state.users.storedUsers)
    const userChats = useSelector(state => {
        const chatObj = state.chats.chatsData;
        const chatArr = Object.values(chatObj);
        //sắp xếp các tin nhắn mới nhất đưa lên đầu
        const sortNewestMessage = chatArr.sort((a, b) => {
            return new Date(b.updateAt) - new Date(a.updateAt);
        })
        return sortNewestMessage;
    });
    useEffect(() => {
        if (userLogin?.userId) {
            const app = getFirebaseApp();
            const dbRef = ref(getDatabase(app));
            const notifyRef = child(dbRef, 'notifications')
            const queryRef = query(notifyRef, orderByChild('sendTo'), equalTo(userLogin?.userId))
            onValue(queryRef, (snapshot) => {
                if (snapshot.exists()) {
                    const objectNotify = snapshot.val();
                    const arrayNotifies = Object.keys(objectNotify).map(key => ({
                        notiId: key,
                        ...objectNotify[key]
                    }));
                    setCountNoti(arrayNotifies.filter(notify => notify.status === 'pending').length)
                }
            }
            )
        }
    }, [userLogin?.userId])
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
                    <Item
                        title="Cuộc trò chuyện"
                        iconName='create-outline'
                        onPress={() => navigation.navigate('NewChat')} />
                </HeaderButtons>
            },
            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
                    <Item
                        iconName='notifications'
                        color={colors.grey}
                        onPress={() => navigation.navigate('Notification', {
                            userId: userLogin?.userId
                        })} />
                    {countNoti !== 0 && <Text style={styles.textNotification}>{countNoti}</Text>}
                </HeaderButtons>
            }
        })
    }, [countNoti])

    return (
        <PageContainer>
            <PageTitle text="Tin nhắn gần đây" />
            <FlatList
                data={userChats}
                renderItem={(itemData) => {
                    const chatDataObj = itemData.item;
                    //filter other user
                    const otherUserId = chatDataObj.users.find((userId) => userId !== userLogin?.userId);
                    const otherUser = storedUsers[otherUserId];
                    //không có user nào thì return luôn!
                    if (!otherUser) return;
                    return <DataUserItem
                        title={otherUser.fullName}
                        image={otherUser.profilePicture}
                        accountId={otherUser.userId}
                        subTitle={chatDataObj?.latestMessage}
                        onPress={() => {
                            navigation.navigate('ChatScreen', {
                                accountData: otherUser,
                                newChatData: { users: [otherUser.userId, userLogin?.userId] },
                                isFriend: true,
                                chatId: chatDataObj.key
                            })
                        }}
                        textTime={handleTimeMessage(chatDataObj.updateAt)}
                    />
                }}
            />
        </PageContainer>

    )
}
export default ChatListScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNotification: {
        position: 'absolute',
        left: '6%',
        width: 26,
        paddingVertical: 3,
        borderRadius: 13,
        backgroundColor: colors.red,
        color: colors.nearlyWhite,
        textAlign: 'center',
        top: "10%"
    }
})