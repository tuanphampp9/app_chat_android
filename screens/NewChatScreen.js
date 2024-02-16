import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButtons from '../components/CustomHeaderButtons'
import PageContainer from '../components/PageContainer'
import { Octicons } from '@expo/vector-icons';
import colors from '../constants/colors'
import { TextInput } from 'react-native'
import commonStyle from '../constants/commonStyle'
import { FontAwesome } from '@expo/vector-icons';
import { searchUsers } from '../utils/actions/userAction'
import DataUserItem from '../components/DataUserItem'
import { useSelector } from 'react-redux'
const NewChatScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const userLogin = useSelector((state) => state.auth.userData)
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
                    <Item
                        title="Đóng"
                        iconName='return-up-back-outline'
                        onPress={() => navigation.goBack()} />
                </HeaderButtons>
            },
            headerTitle: "Tìm bạn bè"
        })
    }, [])
    const findUser = async () => {
        setIsLoading(true);
        const usersResult = await searchUsers(searchInput.toLowerCase());
        const indexMe = usersResult.findIndex(user => user.userId === userLogin?.userId)
        if (indexMe !== -1) {
            usersResult.splice(indexMe, 1)//hidden current user is logging
        }
        setUsers(usersResult);
        setNoResultsFound(usersResult.length === 0)
        setIsLoading(false);
    }
    useEffect(() => {
        //use debounce
        const delaySearch = setTimeout(() => {
            if (!searchInput || searchInput === '') {
                setUsers([]);
                setNoResultsFound(false);
                return;
            }
            findUser();
        }, 500)
        return () => clearTimeout(delaySearch);
    }, [searchInput])

    return (
        <PageContainer>
            <View style={styles.searchContainer}>
                <Octicons name="search" size={15} color={colors.lightGrey} />
                <TextInput
                    placeholder='Tìm kiếm'
                    style={styles.searchBox}
                    onChangeText={(text) => { setSearchInput(text) }} />
            </View>
            {
                isLoading && <View style={commonStyle.center}>
                    <ActivityIndicator size="large" color={colors.blue} />
                </View>
            }
            {
                !isLoading && users.length !== 0 &&
                <FlatList
                    data={users}
                    renderItem={(itemData) => {
                        return <DataUserItem
                            title={`${itemData.item.firstName} ${itemData.item.lastName}`}
                            image={itemData.item.profilePicture}
                            accountId={itemData.item.userId} />
                    }}
                    keyExtractor={item => {
                        return item.userId
                    }}
                />
            }
            {!isLoading && users.length === 0 && (
                <View style={commonStyle.center}>
                    <FontAwesome
                        name={noResultsFound ? 'question' : 'group'}
                        size={40}
                        color={colors.lightGrey}
                        style={styles.noResultIcon} />
                    <Text
                        style={styles.noResultText}>
                        {noResultsFound ? 'Không tìm thấy' : 'Nhập tên để tìm kiếm'}
                    </Text>
                </View>
            )}
        </PageContainer>
    )
}

export default NewChatScreen

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.extraLightGrey,
        height: 30,
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5
    },
    searchBox: {
        marginLeft: 8,
        fontSize: 15,
        width: '100%'
    },
    noResultIcon: {
        marginBottom: 20
    },
    noResultText: {
        color: colors.textColor,
        fontFamily: 'regular',
        letterSpacing: 0.3
    }
})