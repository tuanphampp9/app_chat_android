import { View, Text, Alert } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import Input from './Input'
import SubmitButton from './SubmitButton'
import validator from '../utils/validationConstrains'
import { reducer } from '../utils/reducers/formReducer'
import { signUp } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
import { getInfoUser } from '../store/authSlice'
const initialState = {
    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false
    },
    errorMessage: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
    inputValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
    formIsValid: true
}
const SignUpForm = ({ setIsSignUp }) => {
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false)
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
    const authHandler = async () => {
        try {
            setIsLoading(true)
            const { dataCreate, userData } = await signUp(formState.inputValues)
            dispatch(getInfoUser({ userData }))
            if (dataCreate.operationType) {
                setIsLoading(false)
                setIsSignUp(false)//next to login
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Input
                id="firstName"
                label="Họ"
                icon="user"
                iconSize={20}
                errorText={formState.errorMessage["firstName"]}
                onInputChanged={inputChangedHandler} />
            <Input
                id="lastName"
                label="Tên"
                icon="user"
                iconSize={20}
                errorText={formState.errorMessage["lastName"]}
                onInputChanged={inputChangedHandler} />
            <Input
                id="email"
                label="Email"
                icon="mail"
                isEmail={true}
                iconSize={20}
                errorText={formState.errorMessage["email"]}
                onInputChanged={inputChangedHandler} />
            <Input
                id="password"
                label="Mật khẩu"
                icon="lock"
                isSecureText={true}
                iconSize={20}
                errorText={formState.errorMessage["password"]}
                onInputChanged={inputChangedHandler} />
            <SubmitButton
                title="Sign up"
                isLoading={isLoading}
                disabled={formState.formIsValid}
                onPress={authHandler} />
        </>
    )
}

export default SignUpForm