import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '../screens/ChatListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from '../screens/ChatScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitle: ''
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
        </Tab.Navigator>
    )
}
const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
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
        </Stack.Navigator>
    )
}

export default MainNavigator