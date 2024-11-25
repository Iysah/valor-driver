import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ArrowBack, EditIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { COLORS } from '@/styles/colors'
import Constants from 'expo-constants';
import { useAuth } from '@/context/AuthContext';
import ThemeInput from '@/components/ThemeInput'

const Profile = ({navigation}: {navigation: any}) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { user, logout, } = useAuth();

  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight }}>
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10} style={[GLOBALSTYLES.container]}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingTop: 30, backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 16, width: '100%'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowBack />
                </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.light.primary }}>Profile</Text>
                </View>

                {/* <OptionsIcon /> */}
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 }}>
                <View style={styles.profileContainer}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{ uri: user?.profilePicture.url }} 
                            style={styles.profileImage} 
                        />
                        <TouchableOpacity style={styles.editButton}>
                            <EditIcon style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{user?.fName} {user?.lName}</Text>
                </View>

                <View style={[{marginTop: 40 }]}>
                    <ThemeInput value={user?.phoneNumber} setValue={setPhoneNumber} type='tel' label='Phone number' placeholder={'80-11x-xxxxx'} />
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    imageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.light.primary,
        padding: 8,
        borderRadius: 20,
    },
    editIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 16,
        color: COLORS.light.primary,
    },
    inputContainer: {
        marginTop: 40,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 16,
    },
    countryCode: {
        fontSize: 16,
        marginRight: 8,
    },
    phoneNumber: {
        fontSize: 16,
        color: '#333',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 24,
    },
    saveButton: {
        backgroundColor: COLORS.light.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})