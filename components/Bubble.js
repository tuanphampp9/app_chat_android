import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import colors from '../constants/colors';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
const MenuItem = props => {
    const { text, onSelect, nameIcon } = props
    return <MenuOption onSelect={onSelect}>
        <View style={styles.menuItemContainer}>
            <Text style={styles.menuText}>{text}</Text>
            <Ionicons name={nameIcon} size={18} color="black" />
        </View>
    </MenuOption>
}
const Bubble = (props) => {
    const { text, type, keyIndex } = props;
    const bubbleStyle = { ...styles.container };
    const textStyle = { ...styles.text };
    const wrapperStyle = { ...styles.wrapperStyle };
    const menuRef = React.useRef(null);
    let Container = View;
    switch (type) {
        case "system":
            textStyle.color = '#65644A';
            bubbleStyle.backgroundColor = colors.beige;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;
        case 'error':
            bubbleStyle.backgroundColor = colors.red;
            textStyle.color = 'white';
            bubbleStyle.marginTop = 10;
        case 'myMessage':
            wrapperStyle.justifyContent = 'flex-end';
            bubbleStyle.backgroundColor = '#E7FED6';
            bubbleStyle.maxWidth = '90%';
            Container = TouchableWithoutFeedback;
            break;
        case 'theirMessage':
            wrapperStyle.justifyContent = 'flex-start';
            bubbleStyle.maxWidth = '90%';
            Container = TouchableWithoutFeedback;
        default:
            break;
    }
    const copyToClipboard = async (text) => {
        try {
            await Clipboard.setStringAsync(text);
        } catch (error) {
            console.log('err: ', error);
        }
    }
    return (
        <View style={wrapperStyle}>
            <Container onLongPress={() => menuRef.current.props.ctx.menuActions.openMenu(keyIndex)} style={{ width: '100%' }}>
                <View style={bubbleStyle}>
                    <Text style={textStyle}>
                        {text}
                    </Text>
                    <Menu ref={menuRef} name={keyIndex}>
                        <MenuTrigger />
                        <MenuOptions>
                            <MenuItem text='Sao chép' onSelect={() => copyToClipboard(text)} nameIcon="copy-outline" />
                            <MenuOption text='Option 2' />
                            <MenuOption text='Option 3' />
                        </MenuOptions>
                    </Menu>
                </View>
            </Container>
        </View>
    )
}

export default Bubble

const styles = StyleSheet.create({
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 5,
        marginBottom: 10
    },
    text: {
        fontFamily: 'regular',
        letterSpacing: 0.3
    },
    menuItemContainer: {
        flexDirection: 'row',
        padding: 5
    },
    menuText: {
        flex: 1,
        fontFamily: 'regular',
        letterSpacing: 0.3
    }
})