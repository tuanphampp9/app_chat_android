import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const ChatListScreen = ({ navigation }) => {
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