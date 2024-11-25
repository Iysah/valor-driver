import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ArrowBack, FilterIcons, OptionsIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import Constants from 'expo-constants'
import { COLORS } from '@/styles/colors'

const Notifications = ({ navigation }: any) => {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight }}>
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10} style={[GLOBALSTYLES.container]}>
            <ScrollView showsVerticalScrollIndicator={false} style={[GLOBALSTYLES.wrapper, { backgroundColor: '#fff' }]}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowBack />
                    </TouchableOpacity>
                        <Text style={{ fontSize: 30, fontWeight: '700', color: COLORS.light.primary }}>Notifications</Text>
                    </View>

                    <FilterIcons />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default Notifications

const styles = StyleSheet.create({})