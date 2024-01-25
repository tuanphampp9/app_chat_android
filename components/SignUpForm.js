import { View, Text } from 'react-native'
import React from 'react'
import Input from './Input'
import SubmitButton from './SubmitButton'
import validator, { validateEmail, validatePassword, validateString } from '../utils/validationConstrains'
const SignUpForm = () => {
    const inputChangedHandler = (inputId, inputValue) => {
        console.log(validator(inputId, inputValue))
    }

    return (
        <>
            <Input
                id="firstName"
                label="Họ"
                icon="user"
                iconSize={20}
                errorText="This is an error"
                onInputChanged={inputChangedHandler} />
            <Input
                id="lastName"
                label="Tên"
                icon="user"
                iconSize={20}
                errorText="This is an error"
                onInputChanged={inputChangedHandler} />
            <Input
                id="email"
                label="Email"
                icon="mail"
                isEmail={true}
                iconSize={20}
                errorText="This is an error"
                onInputChanged={inputChangedHandler} />
            <Input
                id="password"
                label="Mật khẩu"
                icon="lock"
                isSecureText={true}
                iconSize={20}
                errorText="This is an error"
                onInputChanged={inputChangedHandler} />
            <SubmitButton
                title="Sign up"
                disabled={false}
                onPress={() => console.log('Button pressed')} />
        </>
    )
}

export default SignUpForm