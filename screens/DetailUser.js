import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../utils/actions/userAction'
import colors from '../constants/colors'
import SubmitButton from '../components/SubmitButton'
import ProfileImage from '../components/ProfileImage'

const DetailUser = ({ navigation, route }) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Trang cá nhân"
        })
    }, [])
    const { accountId } = route.params;
    const [accountData, setAccountData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData(accountId);
            setAccountData(data);
        }
        fetchData();
    }, [accountId])
    console.log('info account: ', accountData);
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
                    title="Thêm bạn bè" />
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