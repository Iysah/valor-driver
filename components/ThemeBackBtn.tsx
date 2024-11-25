import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowBack } from '@/assets/icons/icon'

const ThemeBackBtn = ({navigation, color} : any) => {
  return (
    <Pressable style={[styles.btnContainer]} onPress={() => navigation.goBack()}>
      <ArrowBack color={color} />
    </Pressable>
  )
}

export default ThemeBackBtn

const styles = StyleSheet.create({
    btnContainer: {
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 3,
        // marginBottom: 16
    }
})