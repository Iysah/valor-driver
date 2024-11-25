import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ArrowBack, OptionsIcon } from '@/assets/icons/icon'
import Constants from 'expo-constants'

const Privacy = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight }}>
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10} style={[GLOBALSTYLES.container]}>
            <ScrollView showsVerticalScrollIndicator={false} style={[GLOBALSTYLES.wrapper, { backgroundColor: '#fff' }]}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowBack />
                    </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#000' }}>Privacy Policy</Text>
                    </View>

                    <OptionsIcon />
                </View>

                <Text style={{ fontSize: 16, fontWeight: '400', color: '#000', lineHeight: 24, marginTop: 40 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis facilisi dolor odio sed venenatis nisi malesuada nisl, eget. Egestas id laoreet imperdiet at natoque molestie pulvinar tincidunt.</Text>

                <Text style={{ fontSize: 16, fontWeight: '400', color: '#000', lineHeight: 24, marginTop: 20   }}>Sem sit faucibus at id. Phasellus aliquet elementum, arcu viverra vitae vulputate senectus mattis. Leo nec at ac et purus. A massa eget morbi malesuada egestas bibendum consequat. Eu sem quis fringilla integer nulla dui nunc justo. </Text>

                <Text style={{ fontSize: 16, fontWeight: '400', color: '#000', lineHeight: 24, marginTop: 20   }}>Euismod at sed augue nullam rhoncus, aliquet tortor sed enim. In mauris habitant tellus ut mi leo praesent fringilla. Erat lectus volutpat euismod in massa sit egestas. Placerat sagittis habitasse eros, consequat ultricies mauris vestibulum nulla nec. Non congue tristique in in.</Text>

                <Text style={{ fontSize: 16, fontWeight: '400', color: '#000', lineHeight: 24, marginTop: 20   }}>Quis vulputate euismod urna augue aliquam faucibus purus. Ut cursus et senectus sit viverra. Diam nisl, ullamcorper nulla blandit. Integer nunc elementum dapibus neque lacus. Fames placerat id tincidunt donec. Feugiat sem eget proin ut tellus diam. Auctor.</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default Privacy

const styles = StyleSheet.create({})