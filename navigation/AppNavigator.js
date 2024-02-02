import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux'
import StartUpScreen from '../screens/StartUpScreen';


const AppNavigator = (props) => {
    const isAuth = useSelector(state => state.auth.token !== null);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin)

    const conditionRender = () => {
        if (isAuth) {
            return <MainNavigator />
        } else {
            if (didTryAutoLogin) {
                return <AuthScreen />
            }
            return <StartUpScreen />
        }
    }
    return (
        <NavigationContainer>
            {conditionRender()}
        </NavigationContainer>
    )
}

export default AppNavigator