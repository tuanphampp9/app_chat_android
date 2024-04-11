import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { child, equalTo, getDatabase, onValue, orderByChild, query, ref } from 'firebase/database';
import { getFirebaseApp } from '../utils/firebaseConfig';
import DataUserRequestFriend from '../components/DataUserRequestFriend';

const NotificationScreen = ({ route }) => {
    const [listNotiRequestFriend, setListNotiRequestFriend] = useState([]);
    const { userId } = route.params;
    useEffect(() => {
        if (userId) {
            const app = getFirebaseApp();
            const dbRef = ref(getDatabase(app));
            const notifyRef = child(dbRef, 'notifications')
            //tim nhung loi moi ket ban cua minh (sendTo=userId)
            const queryRef = query(notifyRef, orderByChild('sendTo'), equalTo(userId))
            onValue(queryRef, (snapshot) => {
                if (snapshot.exists()) {
                    const objectNotify = snapshot.val();
                    const arrayNotifies = Object.keys(objectNotify).map(key => ({
                        ...objectNotify[key],
                        idNotify: key
                    }));
                    const arrFilterPending = arrayNotifies.filter((notify) => notify.status === 'pending')
                    setListNotiRequestFriend(arrFilterPending)
                }
            }
            )
        }
    }, [userId])
    return (
        <View style={styles.container}>
            {listNotiRequestFriend.length === 0 ?
                <Text style={styles.textEmpty}>Chưa có lời mời nào!</Text>
                :
                <FlatList
                    data={listNotiRequestFriend}
                    renderItem={(itemData) => {
                        return <DataUserRequestFriend
                            title={itemData.item.fullName}
                            image={itemData.item.profilePicture}
                            createAt={itemData.item.createAt}
                            idNotify={itemData.item.idNotify}
                            sendFrom={itemData.item.sendFrom}
                            sendTo={itemData.item.sendTo}
                        />
                    }}
                    keyExtractor={item => {
                        return item.idNotify
                    }}
                />
            }
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textEmpty: {
        textAlign: 'center',
        fontFamily: 'boldItalic',
        fontSize: 20,
        marginTop: 120
    }
})