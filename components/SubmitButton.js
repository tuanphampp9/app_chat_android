import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import colors from '../constants/colors'

const SubmitButton = ({ disabled, title, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            disabled={disabled}
            onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabled: {
        backgroundColor: colors.grey
    }
})