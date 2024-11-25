import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import ThemeText from '../ThemeText';
import { GLOBALSTYLES } from '@/styles/global-styles';
import { ArrowDownIcon } from '@/assets/icons/icon';

type Iprops = {
   data?:any,
   label: string,
   value: string,
   setValue: any,
   placeholder: string,
   child?: ReactNode
}

const DropdownMenu = ({data, label, placeholder, value, setValue, child}:Iprops) => {
  return (
   <View style={{marginBottom: 20}}>
      <ThemeText style={{marginBottom: 10}} type='labelText'>{label}</ThemeText>
      {child && <View style={{ marginVertical: 10 }}>{child}</View>}
      <Menu>
         <MenuTrigger style={[GLOBALSTYLES.row, styles.cardBtn, {gap: 10, justifyContent: 'space-between'}]}>
            <ThemeText type={ !value ? "secondaryNormalText" : 'primaryNormalText'} style={styles.inputText}>{value ? value : placeholder}</ThemeText>
            <ArrowDownIcon />
         </MenuTrigger>
         <MenuOptions optionsContainerStyle={[styles.dropmenu, {borderRadius: 6}]}>
            <FlatList
               data={data}
               showsVerticalScrollIndicator={false}
               renderItem={({item}) => (
                  <MenuOption style={{paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => setValue(item?.key)} >
                     <ThemeText type='primaryNormalText' style={styles.inputText}>{item?.key}</ThemeText>
                  </MenuOption>
               )}
            />
         </MenuOptions>
      </Menu>
   </View>
  )
}

export default DropdownMenu

const styles = StyleSheet.create({
   inputText: {
      textTransform: 'capitalize',
      fontSize: 12
   },
   cardBtn: {
      width: '100%',
      height: 50,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 16
  },
  dropmenu: {
      position: 'absolute', 
      backgroundColor: '#fff', 
      width: '75%', 
      maxHeight: '50%',
      top: 40, 
      right: 10, 
      borderRadius: 12,
      marginTop: 40,
      paddingVertical: 10,
      shadowColor: 'rgba(0,0,0,0.5)', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      transform: 'translate(x: 0px, y: -100px )',
      zIndex: 1000
   },
})