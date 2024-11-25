import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemeText from '../ThemeText'
import { NotificationIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { COLORS } from '@/styles/colors'

type Iprops = {
   title: string,
   navigation: any
}
const NoteHeader = ({title, navigation}:Iprops) => {
  return (
    <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between', marginBottom: 25}]}>
      <View style={{paddingTop: 10}}>
         <ThemeText type='header' style={{color: COLORS.light.primary, fontSize: 30}}>{title}</ThemeText>
      </View>
      <TouchableOpacity onPress={navigation}><NotificationIcon /></TouchableOpacity>
    </View>
  )
}

export default NoteHeader

const styles = StyleSheet.create({})