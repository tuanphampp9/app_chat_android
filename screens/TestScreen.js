import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import PageContainer from '../components/PageContainer'
import PageTitle from '../components/PageTitle'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { createStudent, createTest } from '../utils/actions/testActions'
import { getFirebaseApp } from '../utils/firebaseConfig'
import { child, getDatabase, onValue, ref, set } from 'firebase/database'
import ModalEdit from '../components/ModalEdit'
import { TextInput } from 'react-native-gesture-handler'
import { RadioGroup } from 'react-native-radio-buttons-group'

const TestScreen = () => {
    const [idStudent, setIdStudent] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [diemTb, setDiemTb] = useState(0);
    const [dobStudent, setDOBStudent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [testSelected, setTestSelected] = useState({});
    const submitHandler = async () => {
        try {
            setIsLoading(true);
            await createStudent({
                id: idStudent,
                fullName: fullName,
                address: address,
                email: email,
                diemTb: diemTb,
                gender: selectedGender,
                dob: dobStudent
            });
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    const onChangeText = (inputId, text) => {
        switch (inputId) {
            case 'Id':
                setIdStudent(text)
                break;
            case 'fullName':
                setFullName(text)
                break;
            case 'address':
                setAddress(text)
                break;
            case 'email':
                setEmail(text)
                break;
            case 'diemTb':
                setDiemTb(text)
            case 'dob':
                setDOBStudent(text);
                break;
        }
    }

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Nam',
            value: 1
        },
        {
            id: '2',
            label: 'Nữ',
            value: 0
        }
    ]), []);

    const handleDisabled = useMemo(() => {
        return !idStudent || !fullName || !address || !email || !diemTb || !selectedGender || !dobStudent
    })

    return (
        <PageContainer>
            <ScrollView>
                <Input
                    label="Mã sinh viên"
                    id='Id'
                    icon="book"
                    iconSize={20}
                    value={idStudent}
                    errorText={''}
                    onInputChanged={onChangeText} />
                <Input
                    label="Họ và tên"
                    id='fullName'
                    icon="book"
                    iconSize={20}
                    value={fullName}
                    errorText={''}
                    onInputChanged={onChangeText} />
                <Input
                    label="Địa chỉ"
                    id='address'
                    icon="book"
                    iconSize={20}
                    value={address}
                    errorText={''}
                    onInputChanged={onChangeText} />
                <Input
                    label="Email"
                    id='email'
                    icon="book"
                    iconSize={20}
                    value={email}
                    errorText={''}
                    onInputChanged={onChangeText}
                    isEmail={true} />
                <Input
                    label="Ngày sinh"
                    id='dob'
                    icon="book"
                    iconSize={20}
                    value={dobStudent}
                    errorText={''}
                    onInputChanged={onChangeText}
                    isEmail={true} />
                <View>
                    <Text>Điểm trung bình</Text>
                    <TextInput
                        keyboardType='numeric'
                        value={diemTb}
                        onChangeText={(text) => onChangeText('diemTb', text)}
                    />
                </View>
                <View>
                    <Text>Giới tính</Text>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedGender}
                        selectedId={selectedGender}
                        layout='row'
                    />
                </View>


                <SubmitButton
                    title="Gửi"
                    isLoading={isLoading}
                    onPress={submitHandler}
                    disabled={handleDisabled} />
                {/* {
                    openModalEdit &&
                    <ModalEdit
                        isModalVisible={openModalEdit}
                        handleModal={() => setOpenModalEdit(false)}
                        inputTest={inputTest}
                        onChangeText={onChangeText}
                        testSelected={testSelected}
                    />
                } */}
            </ScrollView>
        </PageContainer>
    )
}

export default TestScreen