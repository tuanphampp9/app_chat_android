import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../utils/actions/userAction'
import colors from '../constants/colors'
import SubmitButton from '../components/SubmitButton'
import ProfileImage from '../components/ProfileImage'
import { sendRequestFriend } from '../utils/actions/notificationAction'
import { useSelector } from 'react-redux'
import { getFirebaseApp } from '../utils/firebaseConfig'
import { child, getDatabase, onValue, ref } from 'firebase/database'
const DetailUser = ({ navigation, route }) => {
    const [statusRequest, setStatusRequest] = useState('');
    const { accountId } = route.params;
    const userLogin = useSelector((state) => state.auth.userData)
    const [accountData, setAccountData] = useState({});
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Trang cá nhân"
        })
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData(accountId);
            setAccountData(data);
        }
        fetchData();
    }, [accountId])
    useEffect(() => {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const notifyRef = child(dbRef, 'notifications')
        onValue(notifyRef, (snapshot) => {
            if (snapshot.exists()) {
                const objectNotify = snapshot.val();
                const arrayNotifies = Object.keys(objectNotify).map(key => ({
                    ...objectNotify[key],
                    ids: [objectNotify[key].sendFrom, objectNotify[key].sendTo]
                }));
                arrayNotifies.forEach(noti => {
                    if (noti.ids.includes(userLogin?.userId) && noti.ids.includes(accountId)) {
                        setStatusRequest(noti.status);
                    }
                })
            }
        }
        )
    }, [accountId, userLogin])
    const objStatus = {
        pending: 'Đang chờ',
        approved: 'Bạn bè',
        rejected: ''
    }
    const actionSendRequest = async () => {
        const result = await sendRequestFriend(accountId, {
            userId: userLogin.userId,
            fullName: userLogin.fullName,
            profilePicture: userLogin.profilePicture
        })
    }

    if (Object.keys(accountData).length === 0) {
        return <Text>Đang có lỗi xảy ra</Text>
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxChild}>
                <ProfileImage
                    uri={accountData.profilePicture}
                    size={200}
                    showEditBtn={false} />
                <Text style={styles.textName}>{accountData.fullName}</Text>
                <Text style={styles.textAbout}>{accountData?.about}</Text>
            </View>
            <View style={styles.boxBtn}>
                <SubmitButton
                    title="Nhắn tin"
                    style={styles.btnSendMsg}
                    onPress={() => navigation.navigate("ChatScreen")} />
                <SubmitButton
                    title={statusRequest === '' ? "Thêm bạn bè" : objStatus[statusRequest]}
                    disabled={['approved', 'pending'].includes(statusRequest)}
                    onPress={actionSendRequest} />
            </View>
        </View>
    )
}

export default DetailUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    textName: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'boldItalic',
        letterSpacing: 0.4,
        marginTop: 10
    },
    textAbout: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'lightItalic',
        letterSpacing: 0.2
    },
    boxBtn: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnSendMsg: {
        marginRight: 10,
        backgroundColor: colors.blue
    }
})