import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButtons from '../components/CustomHeaderButtons'
import colors from '../constants/colors'
const ChatListScreen = ({ navigation }) => {
    const listNotification = 0;
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
                    {listNotification !== 0 && <Text style={styles.textNotification}>1</Text>}
                </HeaderButtons>
            }
        })
    })
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