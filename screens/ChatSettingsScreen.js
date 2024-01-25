import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ChatSettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ChatSettingsScreen</Text>
        </View>
    )
}

export default ChatSettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})