import { child, getDatabase, push, ref, update } from 'firebase/database';
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

export const sendTextMessage = async (chatId, senderId, messageText) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const messageRef = child(dbRef, `messages/${chatId}`)
    const messageData = {
        sendBy: senderId,
        sendAt: new Date().toString(),
        text: messageText
    }
    await push(messageRef, messageData);
    //cập nhật chat khi gửi tin nhắn
    await updateChat(chatId, senderId, messageText)
}

export const updateChat = async (chatId, senderId, messageText) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const chatRef = child(dbRef, `chats/${chatId}`);
    await update(chatRef, {
        updatedBy: senderId,
        updateAt: new Date().toString(),
        latestMessage: messageText
    })
}