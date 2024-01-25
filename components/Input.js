import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import colors from '../constants/colors'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const Input = ({ id, label, icon, iconSize, errorText, isSecureText, onInputChanged, isEmail }) => {
    const [openPassword, setOpenPassword] = useState(!!isSecureText)
    const onChangeText = text => {
        onInputChanged(id, text)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View
                style={styles.inputContainer}>
                <AntDesign name={icon} size={iconSize || 15} style={styles.icon} />
                <TextInput
                    secureTextEntry={openPassword}
                    style={styles.input}
                    onChangeText={onChangeText}
                    keyboardType={isEmail ? 'email-address' : 'default'} />
                {isSecureText && <TouchableOpacity onPress={() => setOpenPassword(prev => !prev)}>
                    <Entypo name={!openPassword ? "eye" : "eye-with-line"} size={24} color="black" />
                </TouchableOpacity>
                }
            </View>
            {errorText && <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorText}</Text>
            </View>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    label: {
        marginVertical: 8,
        fontFamily: 'bold',
        letterSpacing: 0.3,
        color: colors.textColor
    },
    inputContainer: {
        width: '100%',
        backgroundColor: colors.nearlyWhite,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        marginRight: 10,
        color: colors.grey
    },
    input: {
        color: colors.textColor,
        flex: 1,
        fontFamily: 'regular',
        letterSpacing: 0.3
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        fontFamily: 'regular',
        letterSpacing: 0.3
    }
})