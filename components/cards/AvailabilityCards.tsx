import { ActivityIndicator, Alert, Dimensions, Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, useAnimatedValue } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import ThemeText from '../ThemeText'
import { ArrowDownIcon, CancelTickIcon, OptionsIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { publishVehicle } from '@/api/host/fleet'
import { deleteUnavailable } from '@/api/host/driver'
import formatDateRange from '@/utils/dateFormatter'

const {width, height} = Dimensions.get('screen')

const AvailablityCards = ({details, fetchAvailableCars, navigation}:any) => {
   // const {carDetails: {customerAlias}, id, plateNumber, carImages, publish, approvalEligible} = details || null
   const [deleting, setDeleting] = useState(false)
   const handleDelete = async() => {
      setDeleting(true)
      try {
         const res = await deleteUnavailable(details?._id)
         fetchAvailableCars()
      } catch (error:any) {
         Alert.alert(error?.response?.data)
      }finally{
         setDeleting(false)
      }
   }

  return (
      <View style={[styles.cardContainer, GLOBALSTYLES.row, {alignItems: 'center', zIndex: -1}]}>
         <Pressable style={[styles.cardImageWrapper]}>
            <Image style={[styles.cardImage]} source={details?.vehicleId?.carImages ? {uri: details?.vehicleId?.carImages?.frontView?.url} : require('@/assets/images/placeholder.png')} />
         </Pressable>
         <View style={[{flex: 1.2}]}>
            <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between', gap: 5}]}>
               <ThemeText type='header' style={{fontSize: 14}} numberOfLines={1}>{details?.vehicleId?.carDetails?.carMake} {details?.vehicleId?.carDetails?.carModel}</ThemeText>
               <Menu>
               <MenuTrigger style={[{gap: 10}]}>
                  <OptionsIcon />
               </MenuTrigger>
               <MenuOptions optionsContainerStyle={[styles.menu, {width: 185, borderRadius: 16}]}>
                  <MenuOption style={{paddingVertical: 12, paddingHorizontal: 20}} onSelect={handleDelete} >
                     <ThemeText type='primaryNormalText' style={{}}>{deleting ? <ActivityIndicator /> : 'Delete'}</ThemeText>
                  </MenuOption>
               </MenuOptions>
            </Menu>
            </View>
            <View style={{borderBottomColor: '#F4F4F4', borderBottomWidth: 1, paddingBottom: 12, gap:2}}>
               <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>Reg No: {details?.vehicleId?.plateNumber}</ThemeText>
            </View>

            <View style={[{justifyContent: 'space-between', marginTop: 8, gap: 2}]}>
               <ThemeText type='primaryNormalText' style={{fontSize: 12, color: '#E33E38'}}>Unavailable</ThemeText>
               <ThemeText type='primaryNormalText' style={{fontSize: 12}}>From: {formatDateRange(details?.unAvailableDates[0], details?.unAvailableDates[details?.unAvailableDates.length - 1])}</ThemeText>
            </View>
         </View>
      </View>
  )
}

export default AvailablityCards

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
      height: width/2.5,
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
   },
   menu: {
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
})