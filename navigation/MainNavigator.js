import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '../screens/ChatListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import DetailUser from '../screens/DetailUser';
import NotificationScreen from '../screens/NotificationScreen';
import { useSelector, useDispatch } from 'react-redux'
import { getFirebaseApp } from '../utils/firebaseConfig';
import { child, get, getDatabase, off, onValue, ref } from 'firebase/database';
import { setChatsData } from '../store/chatSlice';
import colors from '../constants/colors';
import commonStyle from '../constants/commonStyle';
import { setStoredUsers } from '../store/usersSlice';
import { setChatMessages } from '../store/messagesSlice';
import TestScreen from '../screens/TestScreen';
import { list } from 'firebase/storage';
import ListStudent from '../screens/ListStudent';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitle: '',
                headerShadowVisible: false
            }}>
            <Tab.Screen name="ChatList" component={ChatListScreen}
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: (props) => {
                        const { color, size } = props
                        return <Ionicons name="chatbubble-outline" size={size} color={color} />
                    }
                }} />
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarLabel: 'Cài đặt',
                    tabBarIcon: (props) => {
                        const { color, size } = props
                        return <Ionicons name="settings-outline" size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen name="addStudent" component={TestScreen}
                options={{
                    tabBarLabel: 'Thêm mới',
                    tabBarIcon: (props) => {
                        const { color, size } = props
                        return <Ionicons name="book-outline" size={size} color={color} />
                    },
                    headerLeft: () => <Text>Thêm sinh viên</Text>
                }}
            />
            <Tab.Screen name="listStudent" component={ListStudent}
                options={{
                    tabBarLabel: 'Danh sách',
                    tabBarIcon: (props) => {
                        const { color, size } = props
                        return <Ionicons name="book-outline" size={size} color={color} />
                    },
                    headerLeft: () => <Text>Danh sách sinh viên</Text>
                }}
            />
        </Tab.Navigator>
    )
}
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Group>
                <Stack.Screen name="Home" component={TabNavigator}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="ChatScreen" component={ChatScreen}
                    options={{
                        gestureEnabled: true//vuốt
                    }} />
                <Stack.Screen name="ChatSettings" component={ChatSettingsScreen}
                    options={{
                        headerTitle: 'Settings'
                    }} />
                <Stack.Screen name="DetailUser" component={DetailUser} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name='NewChat'
                    component={NewChatScreen} />
                <Stack.Screen
                    name='Notification'
                    component={NotificationScreen}
                    options={{
                        headerTitle: 'Lời mời kết bạn'
                    }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
const MainNavigator = () => {
    const userLogin = useSelector((state) => state.auth.userData);
    const storedUsers = useSelector((state) => state.users.storedUsers)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('Subscribing to firebase listeners');
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userChatsRef = child(dbRef, `userChats/${userLogin?.userId}`);
        const refs = [userChatsRef];
        onValue(userChatsRef, (querySnapshot) => {
            let chatsFoundCount = 0;
            const chatsData = {};
            const chatIdsObj = querySnapshot.val() ?? {};
            const chatIdsArr = Object.values(chatIdsObj);
            chatIdsArr.forEach((chatId) => {
                const chatRef = child(dbRef, `chats/${chatId}`)
                refs.push(chatRef);
                onValue(chatRef, (chatSnapshot) => {
                    chatsFoundCount++;
                    const valueChat = chatSnapshot.val();
                    const keyChat = chatSnapshot.key;
                    if (valueChat) {
                        valueChat.key = keyChat;
                        chatsData[keyChat] = valueChat;
                        //lưu dữ liệu của các users khác
                        valueChat.users.forEach(userId => {
                            if (storedUsers[userId]) {
                                return;
                            }
                            const userRef = child(dbRef, `users/${userId}`)
                            get(userRef)
                                .then(userSnapshot => {
                                    const userSnapshotData = userSnapshot.val();
                                    dispatch(setStoredUsers({ newUsers: { userSnapshotData } }))
                                })
                            refs.push(userRef)
                        })
                    }
                    if (chatsFoundCount >= chatIdsArr.length) {
                        dispatch(setChatsData({ chatsData }))
                        setIsLoading(false);
                    }
                })
                if (chatsFoundCount === 0) {
                    setIsLoading(false);
                }

                //lưu messages vào redux
                const messagesRef = child(dbRef, `messages/${chatId}`)
                refs.push(messagesRef);
                onValue(messagesRef, messagesSnapshot => {
                    const messagesData = messagesSnapshot.val();
                    dispatch(setChatMessages({ chatId, messagesData }))
                })
            })
        })

        return () => {
            console.log('UnSubscribing to  firebase listeners when component unmount!');
            refs.forEach(ref => off(ref))
        }
    }, [])
    if (isLoading) {
        return <View style={commonStyle.center}>
            <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
    }
    return (
        <StackNavigator />
    )
}

export default MainNavigator