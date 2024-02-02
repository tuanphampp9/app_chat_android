import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import colors from '../constants/colors'
import commonStyle from '../constants/commonStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { authenticate, getInfoUser, setDidTryAutoLogin } from '../store/authSlice'
import { getUserData } from '../utils/actions/userAction'
const StartUpScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const storedAuthInfo = await AsyncStorage.getItem('userData');
            if (!storedAuthInfo) {
                console.log("No storage found")
                dispatch(setDidTryAutoLogin(true))
                return;
            }
            const parsedData = JSON.parse(storedAuthInfo);
            const { token, userId, expirationDate } = parsedData;
            if (new Date(expirationDate) <= new Date() || !token || !userId) {
                console.log("No storage found")
                dispatch(setDidTryAutoLogin(true))
                return;
            }

            const userData = await getUserData(userId);
            dispatch(authenticate({ token }))
            dispatch(getInfoUser({ userData }))
        }

        tryLogin();
    }, [dispatch])
    return (
        <View style={commonStyle.center}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )
}

export default StartUpScreen