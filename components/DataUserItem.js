import { View, Text, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import ProfileImage from './ProfileImage'
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
const DataUserItem = (props) => {
    const { userId, title, image } = props;
    const navigation = useNavigation();
    const userLogin = useSelector((state) => state.auth.userData)
    return (
        <TouchableWithoutFeedback onPress={() => {
            if (userId === userLogin.userId) {
                return Alert.alert('Đừng nhầm lẫn như vậy chứ', 'Bạn không thể nhắn tin cho chính bạn')
            }
            navigation.navigate("DetailUser", {
                accountId: userId
            })
        }}
        >
            <View style={styles.container}>
                <ProfileImage
                    uri={image}
                    size={40}
                    showEditBtn={false} />
                <View style={styles.textContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.title}>
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default DataUserItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 7,
        borderBottomColor: colors.extraLightGrey,
        borderBottomWidth: 1,
        alignItems: 'center',
        minHeight: 50
    },
    textContainer: {
        marginLeft: 10,
        fontFamily: 'medium',
        fontSize: 16,
        letterSpacing: 0.3
    }
})