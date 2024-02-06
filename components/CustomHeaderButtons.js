import { View, Text } from 'react-native'
import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors'
const CustomHeaderButtons = (props) => {
    return (
        <HeaderButton
            {...props}
            iconSize={28}
            IconComponent={Ionicons}
            color={props.color ?? colors.blue} />
    )
}

export default CustomHeaderButtons