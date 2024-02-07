import { child, equalTo, get, getDatabase, onValue, orderByChild, push, query, ref, set } from "firebase/database";
import { getFirebaseApp } from "../firebaseConfig";
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

// export const getListNotifyRequestFriend = async (userId) => {
//     try {
//         const app = getFirebaseApp();
//         const dbRef = ref(getDatabase(app));
//         const notifyRef = child(dbRef, 'notifications')
//         let arrayNotifies = []
//         onValue(notifyRef, (snapshot) => {
//             if (snapshot.exists()) {
//                 console.log('snap: ', snapshot.val())
//                 const objectNotify = snapshot.val();
//                 arrayNotifies = Object.keys(objectNotify).map(key => objectNotify[key]);
//             }
//         }
//         )
//         return arrayNotifies
//     } catch (error) {
//         console.log(error);
//     }
// }