import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'
import { TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import logoChat from '../assets/images/imageChat.png'
import { ScrollView } from 'react-native'
const AuthScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={logoChat}
                                resizeMode='contain' />
                        </View>
                        {isSignUp ?
                            <SignUpForm />
                            :
                            <SignInForm />
                        }
                        <TouchableOpacity
                            onPress={() => setIsSignUp((prev) => !prev)}
                            style={styles.linkContainer}>
                            <Text
                                style={styles.link}>{!isSignUp ? "Bạn chưa có tài khoản? Đăng kí ngay!" : "Quay về Đăng nhập"}</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    linkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    link: {
        color: colors.blue,
        fontFamily: 'medium',
        letterSpacing: 0.3
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 200
    }
})