import { child, equalTo, get, getDatabase, onValue, orderByChild, push, query, ref, set, remove, update } from "firebase/database";
import { getFirebaseApp } from "../firebaseConfig";
import { Alert } from "react-native";
// import uuid from 'react-native-uuid';
export const sendRequestFriend = async (accountId, infoUserCurrent) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));

        const dataRequest = {
            sendTo: accountId,
            sendFrom: infoUserCurrent.userId,
            fullName: infoUserCurrent.fullName,
            profilePicture: infoUserCurrent.profilePicture,
            status: 'pending',
            createAt: new Date().toString()
        }

        const notifyRef = child(dbRef, `notifications`);
        // await set(notifyRef, dataRequest) custom id of firebase
        const newNotify = await push(notifyRef, dataRequest)// firebase auto render id
        return newNotify
    } catch (error) {
        console.log(error)
    }
}
export const updateInfoNotify = async (idNotify) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const notifyRef = child(dbRef, `notifications/${idNotify}`)
        await update(notifyRef, { status: 'approved' })
        return true
    } catch (error) {
        console.log('error: ', error)
        Alert.alert('Xin lỗi', 'Có lỗi đã xảy ra')
    }
}

export const createFriend = async (sendFrom, sendTo) => {
    try {
        const friendList = { friendId: sendFrom, userId: sendTo };
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const listFriendRef = child(dbRef, "friend_list");
        await push(listFriendRef, friendList)
        return true;
    } catch (error) {
        console.log('error: ', error)
        Alert.alert('Xin lỗi', 'Có lỗi đã xảy ra')
    }
}

export const deleteNotify = async (idNotify) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const notifyRef = child(dbRef, `notifications/${idNotify}`)
        await remove(notifyRef)
        return true
    } catch (error) {
        console.log(error);
        Alert.alert('Xin lỗi', 'Có lỗi đã xảy ra')
    }
}