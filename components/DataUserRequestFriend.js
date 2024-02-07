import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import ProfileImage from './ProfileImage'
import colors from '../constants/colors';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import { createFriend, deleteNotify, updateInfoNotify } from '../utils/actions/notificationAction';
const DataUserRequestFriend = (props) => {
    const { title, image, createAt, idNotify, sendFrom, sendTo } = props;
    const convertTime = (time) => {
        const date = new Date(time);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        day = day < 10 ? `0${day}` : day;
        month = month < 10 ? `0${month}` : month;
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        return `Ngày ${day}/${month}/${year} lúc ${hours}:${minutes}`
    }
    const rejectedRequestFriend = async (idNotify) => {
        const result = await deleteNotify(idNotify);
        if (result) {
            Alert.alert('Thành công', 'Đã từ chối thành công')
        }
    }
    const acceptedRequestFriend = async (idNotify, sendFrom, sendTo) => {
        const resultUpdateNotify = await updateInfoNotify(idNotify);
        if (resultUpdateNotify) {
            await createFriend(sendFrom, sendTo)
            Alert.alert('Thành công', 'Giờ các bạn có thể nhắn tin cho nhau!')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.infoAccount}>
                <ProfileImage
                    uri={image}
                    size={40}
                    showEditBtn={false} />
                <View style={styles.boxText}>
                    <Text
                        numberOfLines={1}
                        style={styles.textContainer}>
                        {title}
                    </Text>
                    <Text style={styles.textTime}>{convertTime(createAt)}</Text>
                </View>
            </View>
            <View style={styles.boxSubmit}>
                <TouchableOpacity
                    style={styles.iconCheck}
                    onPress={() => acceptedRequestFriend(idNotify, sendFrom, sendTo)}
                >
                    <MaterialIcons name="done" size={30} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconRemove}
                    onPress={() => rejectedRequestFriend(idNotify)}
                >
                    <MaterialIcons name="delete-forever" size={30} color={colors.red} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DataUserRequestFriend

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50,
        justifyContent: 'space-between'
    },
    infoAccount: {
        flexDirection: 'row',
    },
    textContainer: {
        fontFamily: 'medium',
        fontSize: 16,
        letterSpacing: 0.3
    },
    boxSubmit: {
        flexDirection: 'row'
    },
    iconCheck: {
        marginRight: 15
    },
    boxText: {
        marginLeft: 10,
    },
    textTime: {
        fontSize: 12
    }
})