import { View, Text, Alert } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Input from './Input'
import SubmitButton from './SubmitButton'
import validator from '../utils/validationConstrains'
import { reducer } from '../utils/reducers/formReducer'
import { signIn } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
import { authenticate, getInfoUser } from '../store/authSlice'
const initialState = {
    inputValidities: {
        email: false,
        password: false
    },
    errorMessage: {
        email: '',
        password: ''
    },
    inputValues: {
        email: '',
        password: ''
    },
    formIsValid: true
}
const SignInForm = () => {
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validator(inputId, inputValue);
        dispatchFormState({
            type: 'UPDATE_INPUT', payload: {
                inputId,
                errorMessage: result,
                values: inputValue
            }
        })
    }, [dispatchFormState])
    const loginUser = async () => {
        try {
            setIsLoading(true)
            const { result, userData } = await dispatch(signIn(formState.inputValues))
            const { user } = result
            if (user && user.emailVerified) {
                //save info user
                dispatch(getInfoUser({ userData: userData }))
                //verified
                dispatch(authenticate({ token: user.accessToken }))
            } else {
                Alert.alert("Ôi không!", "Bạn chưa xác thực mail!!!")
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Input
                id="email"
                label="Email"
                icon="mail"
                iconSize={20}
                isEmail={true}
                value={formState.inputValues.email}
                errorText={formState.errorMessage["email"]}
                onInputChanged={inputChangedHandler} />
            <Input
                id='password'
                label="Mật khẩu"
                icon="lock"
                isSecureText={true}
                iconSize={20}
                value={formState.inputValues.password}
                errorText={formState.errorMessage["password"]}
                onInputChanged={inputChangedHandler} />
            <SubmitButton
                title="Sign in"
                isLoading={isLoading}
                disabled={formState.formIsValid}
                onPress={loginUser} />
        </>
    )
}

export default SignInForm