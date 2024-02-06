import { child, endAt, get, getDatabase, orderByChild, query, ref, startAt } from "firebase/database"
import { getFirebaseApp } from "../firebaseConfig";

export const getUserData = async (userId) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userRef = child(dbRef, `users/${userId}`);
        const snapshot = await get(userRef);
        return snapshot.val()
    } catch (error) {

    }
}

export const searchUsers = async (keyword) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const userRef = child(dbRef, 'users');
        const queryRef = query(userRef, orderByChild('fullName'), startAt(keyword), endAt(keyword + "\uf8ff"))//unicode character

        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
            const objectUsers = snapshot.val();
            const arrayUsers = Object.keys(objectUsers).map(key => objectUsers[key])
            return arrayUsers
        }
        return []
    } catch (error) {
        console.log(error)
        throw error
    }
}