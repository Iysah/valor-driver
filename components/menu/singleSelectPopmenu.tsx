import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef } from 'react'

import {
   Menu,
   MenuOptions,
   MenuOption,
   MenuTrigger,
 } from 'react-native-popup-menu';
import ThemeText from '../ThemeText';
import { GLOBALSTYLES } from '@/styles/global-styles';


const {width} = Dimensions.get('screen')
const SingleSelectPopmenu = () => {
   const inputRef = useRef<any>(null)
   const handleTriggerPress = () => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus the TextInput when the trigger is pressed
      }
    }
  return (
    <View>
       <Menu>
         <MenuTrigger onPress={handleTriggerPress} style={[GLOBALSTYLES.row, styles.inputBtn, {gap: 10}]}>
            <TextInput ref={inputRef} placeholder='search' style={{zIndex: -1, position: 'absolute', width: '100%'}}/>
         </MenuTrigger>
         <MenuOptions optionsContainerStyle={[styles.dropMenu, {borderRadius: 6}]}>
            <MenuOption style={{paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => alert(`Delete`)} >
               <ThemeText type='primaryNormalText'>Publish</ThemeText>
            </MenuOption>
            <MenuOption style={{paddingHorizontal: 14, paddingVertical: 10}} onSelect={() => alert(`Delete`)} >
               <ThemeText type='primaryNormalText'>Unpublish</ThemeText>
            </MenuOption>
         </MenuOptions>
      </Menu>
    </View>
  )
}

export default SingleSelectPopmenu

const styles = StyleSheet.create({
   inputBtn: {
      width: '100%',
      height: 50,
      backgroundColor: 'green'
   },
   dropMenu: {
      marginTop: 20,
      width: width-40
   },
   inputWrapper: {

   },
   input: {

   }
})