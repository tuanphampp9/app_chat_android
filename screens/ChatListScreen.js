import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButtons from '../components/CustomHeaderButtons'
import colors from '../constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import { getFirebaseApp } from '../utils/firebaseConfig'
import { child, equalTo, getDatabase, onValue, orderByChild, query, ref } from 'firebase/database'
import { getInfoRequestFriend } from '../store/notifySlice'
const ChatListScreen = ({ navigation }) => {
    const [countNoti, setCountNoti] = useState(0);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.auth.userData)
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
                    dispatch(getInfoRequestFriend(arrayNotifies))
                    console.log('snap: ', arrayNotifies)
                    setCountNoti(arrayNotifies.length)
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
                        onPress={() => navigation.navigate('Notification')} />
                    {countNoti !== 0 && <Text style={styles.textNotification}>{countNoti}</Text>}
                </HeaderButtons>
            }
        })
    }, [countNoti])
    return (
        <View style={styles.container}>
            <Text>ChatListScreen</Text>
            <Button title='Go to chat screen' onPress={() => navigation.navigate('ChatScreen')} />
        </View>
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