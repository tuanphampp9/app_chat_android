import { Alert } from "react-native";
import { getFirebaseApp } from "../firebaseConfig"
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import { child, getDatabase, ref, set } from 'firebase/database'
export const signUp = async (dataSubmit) => {
    const { firstName, lastName, email, password } = dataSubmit
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        //email verification
        await sendEmailVerification(result.user)
        console.log('check var: ', result);
        const { uid } = result.user;
        const userData = await createUser({ firstName, lastName, email, userId: uid })
        Alert.alert('Xác thực mail', 'Mời bạn kiểm tra email vừa đăng kí để xác thực!!')
        return {
            dataCreate: result,
            userData
        }
    } catch (error) {
        console.log(error);
        const errorCode = error.code;
        let messageErr = "Something went wrong";
        if (errorCode === 'auth/email-already-in-use') {
            messageErr = 'Địa chỉ email này đã được đăng kí trước đó'
        }
        Alert.alert("Lỗi rồi", messageErr)
        throw new Error(messageErr)
    }
}

const createUser = async (dataSubmit) => {
    const { firstName, lastName, email, userId } = dataSubmit
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const userData = {
        firstName,
        lastName,
        fullName,
        email,
        userId,
        signUpDate: new Date().toString()
    }

    const dbRef = ref(getDatabase())
    const childRef = child(dbRef, `users/${userId}`)
    await set(childRef, userData)
    return userData
}

export const signIn = async (dataSubmit) => {
    const { email, password } = dataSubmit
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result
    } catch (error) {
        console.log(error)
        const errorCode = error.code;
        let messageErr = "Something went wrong";
        if (errorCode === 'auth/invalid-credential') {
            messageErr = 'Tài khoản hoặc mật khẩu không chính xác!'
        }
        Alert.alert("Lỗi rồi", messageErr)
        throw new Error(messageErr)
    }
}