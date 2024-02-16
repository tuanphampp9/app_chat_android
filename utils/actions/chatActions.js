import { child, getDatabase, push, ref } from 'firebase/database';
import { getFirebaseApp } from '../firebaseConfig';
export const createChat = async (loggedInUserId, chatData) => {
    const newChatData = {
        ...chatData,
        createdBy: loggedInUserId,
        updatedBy: loggedInUserId,
        createAt: new Date().toString(),
        updateAt: new Date().toString()
    }

    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const newChat = await push(child(dbRef, 'chats'), newChatData);
    const users = chatData.users;
    users.forEach(async (user) => {
        const userId = user;
        await push(child(dbRef, `userChats/${userId}`), newChat.key)
    });
    return newChat.key;
}