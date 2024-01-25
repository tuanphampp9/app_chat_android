import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux'


const AppNavigator = (props) => {
    const isAuth = useSelector(state => state.auth.token !== null);
    return (
        <NavigationContainer>
            {isAuth ? <MainNavigator /> : <AuthScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator