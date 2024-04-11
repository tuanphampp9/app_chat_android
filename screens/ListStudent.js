import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFirebaseApp } from '../utils/firebaseConfig';
import { child, getDatabase, onValue, ref } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListStudent = () => {
    const [listData, setListData] = useState([]);
    useEffect(() => {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const testRef = child(dbRef, 'students')

        onValue(testRef, (snapshot) => {
            if (snapshot.exists()) {
                const dataTest = snapshot.val();
                const arrData = Object.keys(dataTest).map(key => ({
                    id: key,
                    ...dataTest[key]
                }));
                setListData(arrData);
                console.log('dataTest: ', arrData);
            }
        }
        )
    }, [])
    return (
        <View>
            {listData.length === 0 &&
                <Text>Không có dữ liệu</Text>
            }
            {
                listData.length > 0 &&
                <FlatList
                    data={listData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container}>
                                <Text>Mã sinh viên:{item.id}</Text>
                                <Text>Họ và tên:{item.fullName}</Text>
                                <Text>Địa chỉ: {item.address}</Text>
                                <Text>Điểm Tb:{item.diemTb}</Text>
                                <Text>Email:{item.email}</Text>
                                <Text>Ngày sinh:{item?.dob}</Text>
                                <Text>Giới tính:{item.gender === '1' ? 'Nam' : "Nữ"}</Text>
                            </View>
                        )
                    }}
                />
            }
        </View>
    )
}

export default ListStudent

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderWidth: 1,
        borderColor: 'red',
        margin: 15
    }
})