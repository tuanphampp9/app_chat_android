import { Alert } from "react-native";
import { getFirebaseApp } from "../firebaseConfig"
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import { child, getDatabase, ref, set, update } from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout, updateLoggedUserData } from "../../store/authSlice";
import { getUserData } from '../actions/userAction';
let timer;
export const signUp = async (dataSubmit) => {
    const { firstName, lastName, email, password } = dataSubmit
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)

        //email verification
        await sendEmailVerification(result.user)
        //create user into Realtime database
        const { uid } = result.user;
        const userData = await createUser({ firstName, lastName, email, userId: uid })

        //alert note user verify email
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

export const logoutHandler = (userId) => {
    return async dispatch => {
        AsyncStorage.clear();
        clearTimeout(timer)
        await updateSignedInUserData(userId, { isOnline: false })
        dispatch(logout())
        //set status online when logout
        dispatch(updateLoggedUserData({ newData: { isOnline: false } }))
    }
}
export const signIn = (dataSubmit) => {
    return async dispatch => {
        const { email, password } = dataSubmit
        const app = getFirebaseApp();
        const auth = getAuth(app);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const { stsTokenManager, uid } = result.user;
            //set status online
            await updateSignedInUserData(uid, { isOnline: true })
            const userData = await getUserData(uid);
            //save info into local Emulator
            saveDataToStorage(result.user.accessToken, uid, expirationDate)
            //get time expiration of token(default 1 hour)
            const expirationDate = new Date(stsTokenManager.expirationTime)
            const expirationTime = new Date(result.user.stsTokenManager.expirationTime) - new Date()
            //set timeout token expire to logout
            timer = setTimeout(() => {
                dispatch(logoutHandler())
            }, expirationTime)
            return {
                result,
                userData
            }
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
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token,
        userId,
        expirationDate
    }))
}

export const updateSignedInUserData = async (userId, newData) => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app))
    const childRef = child(dbRef, `users/${userId}`);
    await update(childRef, newData)
}