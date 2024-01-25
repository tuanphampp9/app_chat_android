import { View, Text } from 'react-native'
import React from 'react'
import Input from './Input'
import SubmitButton from './SubmitButton'
import validator from '../utils/validationConstrains'

const SignInForm = () => {
    const inputChangedHandler = (inputId, inputValue) => {
        console.log(validator(inputId, inputValue))
    }
    return (
        <>
            <Input
                id="email"
                label="Email"
                icon="mail"
                iconSize={20}
                isEmail={true}
                errorText="This is an error"
                onInputChanged={inputChangedHandler} />
            <Input
                label="Mật khẩu"
                icon="lock"
                isSecureText={true}
                iconSize={20}
                errorText="This is an error" />
            <SubmitButton
                title="Sign in"
                disabled={false}
                onPress={() => console.log('Button pressed')} />
        </>
    )
}

export default SignInForm