import { ActivityIndicator, Alert, Dimensions, FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from '@react-navigation/native'
import ThemeInput from '../ThemeInput'
import ThemeText from '../ThemeText'
import { getBanksCode } from '@/api/kyc'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'

const {height} = Dimensions.get("screen")
const BankPicker = ({setOpen, setAccName}:any) => {
    const [fetching, setFetching] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [banks, setBanks] = useState<any>([])
    const getAllBanks = async () => {
        setFetching(true)
        const token = await AsyncStorage.getItem("token")
        try {
            const res = await getBanksCode()
            setBanks(res.data.data)
        } catch (error:any) {
                Alert.alert(error?.response?.data?.message)
        }finally{
            setFetching(false)
        }
    }
    const [screenHeight, setScreenHeight] = useState<any>(height)
    useEffect(() => {
        const onKeyboardDidShow = (e:any) => {
          const keyboardHeight = e.endCoordinates.height;
          setScreenHeight(Dimensions.get('window').height - keyboardHeight);
        };
      
        const onKeyboardDidHide = () => {
          setScreenHeight(Dimensions.get('window').height);
        };
      
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
      
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);
      
    useEffect(() => {
        getAllBanks()
    },[])

    const handlePickBank = (code:any, bankName:any) => {
        setAccName({code, bankName})
        setOpen(false)
    }
    const filteredBanks = banks.filter((item:any) => item.name.includes(searchValue))
  return (
    <Pressable onPress={() => setOpen(false)} style={[styles.modalOverlay]}>
      <Pressable onPress={(e) => e.stopPropagation()} style={[styles.modalWrapper, {height: screenHeight * 0.85}]}>
        <View style={[GLOBALSTYLES.center, {marginTop: 8, marginBottom: 45}]}><View style={{width: 60, height: 4, backgroundColor: '#000', borderRadius: 12}} /></View>
        <View style={[styles.inputWrapper, GLOBALSTYLES.row]}>
            <SearchIcon color={'#646464'} />
            <TextInput placeholderTextColor={"#646464"} value={searchValue} onChangeText={setSearchValue} style={[styles.inputField]} keyboardType="web-search"  placeholder={"Find bank"}/>
        </View>

        <FlatList
            ListHeaderComponent={() => fetching && <ActivityIndicator />}
            data={[...filteredBanks]}
            renderItem={({item}:any) => {
                return (
                    <Pressable onPress={() => handlePickBank(item?.code, item?.name)} style={[styles.list]}>
                        <ThemeText type='primaryNormalText'>{item?.name}</ThemeText>
                    </Pressable>
                )
            }}
        />

      </Pressable>
    </Pressable>
  )
}

export default BankPicker

const styles = StyleSheet.create({
    list: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E4E5',
        paddingVertical: 10,
        marginBottom: 10
    },
    modalOverlay: {
        // flex: 1,/
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: height,
        justifyContent: 'flex-end'
    },
    modalWrapper: {
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#fff',
        alignContent: 'flex-end',
        paddingHorizontal: 16
    },
    inputWrapper: {
        width: '100%',
        height: 55,
        borderRadius: 30,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 10,
        gap: 10,
        marginBottom: 25
    },
    inputField: {
        flex: 1,
        height: '100%',
    },
})