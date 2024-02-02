import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButtons from '../components/CustomHeaderButtons'
const ChatListScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
                    <Item
                        title="Cuộc trò chuyện mới"
                        iconName='create-outline' />
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
    }
})