import { ActivityIndicator, Alert, Dimensions, Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, useAnimatedValue } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import ThemeText from '../ThemeText'
import { ArrowDownIcon, CancelTickIcon, OptionsIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'

import {
   Menu,
   MenuOptions,
   MenuOption,
   MenuTrigger,
 } from 'react-native-popup-menu';
import { publishVehicle } from '@/api/host/fleet'
import { useFleetStore } from '@/store/fleet'
import { observer } from 'mobx-react-lite'

const {width, height} = Dimensions.get('screen')

const FleetListCard = observer(({details, pageFrom}:any) => {
   
   const {carDetails: {customerAlias}, id, plateNumber, pricing, published} = details
   const [publishing, setPublishing] = useState(false)
   const { setSelectedVehicle} = useFleetStore()

   const handlePublishing = async(state:string) => {
      setPublishing(true)
      const data = {
         publish: state
      }
      try {
         const res = await publishVehicle(id, data)
      } catch (error:any) {
         Alert.alert(error)
      }finally{
         setPublishing(false)
      }  
   }

  return (
      <View style={[styles.cardContainer, GLOBALSTYLES.row, {alignItems: pageFrom == "SELECTDRIVER" ? 'flex-start' : 'center', zIndex: -1}]}>
         <View style={[styles.cardImageWrapper]}>
            <Image style={[styles.cardImage]} source={ details?.carImages?.status == "filled" ? {uri: details?.carImages?.frontView?.url} : require('@/assets/images/placeholder.png')} />
         </View>
         <View style={[{flex: 1.2, position: 'relative', zIndex: 1}]}>
            <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between', position: 'relative'}]}>
               <ThemeText numberOfLines={1} type='header' style={{fontSize: 12}}>{customerAlias}</ThemeText>
            </View>
            <View style={{zIndex: -1}}>
               {pageFrom == "SELECTDRIVER" && <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>Driver: John Doe</ThemeText>}
               <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>Reg No: {plateNumber}</ThemeText>
            </View>
            {
               pageFrom == "SELECTDRIVER" && (
                  <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between', marginTop: 12, zIndex: -1}]}>
                     <Menu>
                        <MenuTrigger style={[GLOBALSTYLES.row, styles.cardBtn, {gap: 10}]}>
                           <ThemeText type='primaryNormalText' style={{fontSize: 12}}>{publishing ? <ActivityIndicator /> : published ? 'Publish' : "Unpublish"}</ThemeText>
                           <ArrowDownIcon />
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={[styles.publishMenu, {borderRadius: 6}]}>
                           <MenuOption style={{paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => handlePublishing("yes")} >
                              <ThemeText type='primaryNormalText'>Publish</ThemeText>
                           </MenuOption>
                           <MenuOption style={{paddingHorizontal: 14, paddingVertical: 10}} onSelect={() => handlePublishing('no')} >
                              <ThemeText type='primaryNormalText'>Unpublish</ThemeText>
                           </MenuOption>
                        </MenuOptions>
                     </Menu>
                  </View>
               )
            }
         </View>
      </View>
  )
})

export default FleetListCard

const styles = StyleSheet.create({
   publishMenu: {
      position: 'absolute', 
      backgroundColor: '#fff', 
      width: 120, 
      top: 40, 
      right: 10, 
      borderRadius: 12,
      paddingVertical: 10,
      shadowColor: 'rgba(0,0,0,0.5)', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      transform: 'translate(x: 0px, y: -100px )',
      zIndex: 1000
   },

   publishTextWrapper: {
      borderBottomColor: '#E2E4E5',
      
      paddingVertical: 10,
      paddingHorizontal: 15
   },
   optionBtn: {
      // position: 'absolute',
      // top: 10,
      // right: 10,
  },
   cardContainer: {
      padding: 16,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: '#F4F4F4',
      gap: 20,
      height: width/2.7,
      marginBottom: 15,
      zIndex: -1
      
   },
   cardImageWrapper: {
      flex: 1,
   },
   cardImage:{
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 12
   },
   cardBtn: {
      borderWidth: 1,
      borderColor: '#ABB3BF80',
      borderRadius: 40,
      paddingHorizontal: 16,
      paddingVertical: 8,
      width: 'auto'
   }
})