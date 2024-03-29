import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PageContainer = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

export default PageContainer

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'white'
    }
})