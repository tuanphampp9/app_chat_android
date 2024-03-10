import { child, getDatabase, ref, update } from "firebase/database"
import { getFirebaseApp } from "../firebaseConfig";

export const recallMessageApi = async (chatId, messageId) => {
    try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));
        const messageRef = child(dbRef, `messages/${chatId}/${messageId}`);
        await update(messageRef, {
            sendAt: new Date().toString(),
            text: 'Đã thu hồi'
        })
    } catch (error) {

    }
}