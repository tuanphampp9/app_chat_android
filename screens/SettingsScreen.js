import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import PageTitle from '../components/PageTitle'
import PageContainer from '../components/PageContainer'
import validator from '../utils/validationConstrains'
import Input from '../components/Input'
import { reducer } from '../utils/reducers/formReducer'
import { useSelector } from 'react-redux'
import SubmitButton from '../components/SubmitButton'
import { logoutHandler, updateSignedInUserData } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
import { updateLoggedUserData } from '../store/authSlice'
import ProfileImage from '../components/ProfileImage'
const SettingsScreen = () => {
    const userData = useSelector((state) => state.auth.userData)
    const initialState = {
        inputValidities: {
            firstName: true,
            lastName: true,
            email: true,
            about: true
        },
        errorMessage: {
            firstName: '',
            lastName: '',
            email: '',
            about: ''
        },
        inputValues: {
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            about: userData?.about || ''
        },
        formIsValid: true
    }
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
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
    const dispatch = useDispatch();
    const saveHandler = async () => {
        try {
            setIsLoading(true);
            const fullName = `${formState.inputValues.firstName} ${formState.inputValues.lastName}`.toLowerCase();
            const dataUpdates = {
                ...formState.inputValues,
                fullName
            }
            await updateSignedInUserData(userData.userId, dataUpdates)
            dispatch(updateLoggedUserData({ newData: dataUpdates }))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <PageContainer>
            <PageTitle text="Cài đặt" />
            <ScrollView>
                <ProfileImage
                    size={70}
                    userId={userData.userId}
                    uri={userData.profilePicture} />
                <Input
                    id="firstName"
                    label="Họ"
                    icon="user"
                    iconSize={20}
                    value={formState.inputValues.firstName}
                    errorText={formState.errorMessage["firstName"]}
                    onInputChanged={inputChangedHandler} />
                <Input
                    id="lastName"
                    label="Tên"
                    icon="user"
                    iconSize={20}
                    value={formState.inputValues.lastName}
                    errorText={formState.errorMessage["lastName"]}
                    onInputChanged={inputChangedHandler} />
                <Input
                    id="email"
                    label="Email"
                    icon="mail"
                    isEmail={true}
                    iconSize={20}
                    value={formState.inputValues.email}
                    errorText={formState.errorMessage["email"]}
                    onInputChanged={inputChangedHandler} />

                <Input
                    id="about"
                    label="Tiểu sử"
                    icon="infocirlceo"
                    iconSize={20}
                    value={formState.inputValues.about}
                    errorText={formState.errorMessage["about"]}
                    onInputChanged={inputChangedHandler} />

                <SubmitButton
                    title="Lưu"
                    isLoading={isLoading}
                    disabled={formState.formIsValid}
                    onPress={saveHandler} />

                <SubmitButton
                    title="Đăng xuất"
                    onPress={() => dispatch(logoutHandler())}
                    style={{ backgroundColor: 'red' }} />
            </ScrollView>
        </PageContainer>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})