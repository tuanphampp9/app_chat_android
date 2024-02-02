import * as ImagePicker from 'expo-image-picker'
import { getFirebaseApp } from './firebaseConfig';
import uuid from 'react-native-uuid';
import { getDownloadURL, getStorage, uploadBytesResumable, ref as sRef } from 'firebase/storage'
export const launchImagePicker = async () => {
    await checkMediaPermissions();
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,//allow crop image before submit
        aspect: [1, 1],//frame rate,
        quality: 1
    })
    if (!result.canceled) {
        //success
        return result.assets[0].uri
    }
}

export const uploadImageAsync = async (uri) => {
    const app = getFirebaseApp();

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response)
        }
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send();
    })
    const pathFolder = 'profilePics';
    const storageRef = sRef(getStorage(app), `${pathFolder}/${uuid.v4()}`)

    await uploadBytesResumable(storageRef, blob)
    blob.close()
    return await getDownloadURL(storageRef)
}
const checkMediaPermissions = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        return Promise.reject("Chúng tôi cần cấp quyền để truy cập thư viện ảnh của bạn")
    }
    return Promise.resolve();
}