import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import userImage from '../assets/images/userImage.jpeg'
import colors from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { launchImagePicker, uploadImageAsync } from '../utils/ImagePickerConfig';
import { updateSignedInUserData } from '../utils/actions/authActions';
import { useDispatch } from 'react-redux'
import { updateLoggedUserData } from '../store/authSlice';
import { Entypo } from '@expo/vector-icons';
const ProfileImage = ({ size, uri, userId, showEditBtn, isOnline, styleIconStatus }) => {
    const sourceImg = uri ? { uri } : userImage
    const [image, setImage] = useState(null)
    const dispatch = useDispatch();
    const pickImage = async () => {
        try {
            const uriImage = await launchImagePicker();
            if (!uriImage) {
                return;
            }
            //upload the image
            const uploadUrl = await uploadImageAsync(uriImage);
            if (!uploadUrl) {
                throw new Error("Could not upload image");
            }

            //update avatar into database realtime
            await updateSignedInUserData(userId, { profilePicture: uploadUrl })

            //update avatar into redux
            dispatch(updateLoggedUserData({ profilePicture: uploadUrl }))

            //set the image
            setImage({ uri: uploadUrl })
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <TouchableOpacity
            onPress={pickImage}
            style={styles.container}
            disabled={!showEditBtn}
        >
            <Image
                style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
                source={image ? image : sourceImg} />
            {showEditBtn && <View style={styles.editIcon}>
                <FontAwesome name="pencil-square-o" size={24} color="black" />
            </View>}
            {isOnline && <View style={styleIconStatus}>
                <Entypo name="dot-single" size={size} color={colors.statusOnline} />
            </View>}
        </TouchableOpacity>
    )
}

export default ProfileImage

const styles = StyleSheet.create({
    image: {
        borderColor: colors.grey,
        borderWidth: 1,
        height: 80,
        width: 80
    },
    container: {
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: -1,
        left: '55%'
    }
})