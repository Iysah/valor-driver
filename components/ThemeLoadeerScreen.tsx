import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GLOBALSTYLES } from '@/styles/global-styles'

const ThemeLoadeerScreen = () => {
  return (
    <View style={[GLOBALSTYLES.container, GLOBALSTYLES.center]}>
      <Image style={[styles.loaderImg]} source={require('@/assets/images/loading.gif')}/>
    </View>
  )
}

export default ThemeLoadeerScreen

const styles = StyleSheet.create({
    loaderImg: {
        width: 100,
        height: 100
    }
})