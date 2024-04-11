import { View, Text, Modal, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import { updateTest } from '../utils/actions/testActions';
import SubmitButton from './SubmitButton';

const ModalEdit = ({ isModalVisible, handleModal, testSelected }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [inputTest, setInputTest] = useState(testSelected.content);
    const onChangeText = (inputId, text) => {
        setInputTest(text);
    }
    const submitHandler = async () => {
        try {
            setIsLoading(true);
            await updateTest(testSelected.id, inputTest);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Modal isVisible={isModalVisible}>
            <View style={styles.container}>
                <Input
                    label="Username"
                    id='Test'
                    icon="book"
                    iconSize={20}
                    value={inputTest}
                    errorText={''}
                    onInputChanged={onChangeText} />
                <SubmitButton
                    title="Lưu"
                    isLoading={isLoading}
                    onPress={submitHandler} />
                <Button title="ẨN" onPress={handleModal} />
            </View>
        </Modal>
    )
}

export default ModalEdit

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})