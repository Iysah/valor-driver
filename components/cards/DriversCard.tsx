import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import ThemeText from '../ThemeText'
import { ArrowDownIcon, GreenThickIcon, OptionsIcon, StarIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { activateAccount } from '@/api/host/driver'


const DriversCard:FC<any> = ({navigation, details}) => {
   const {profilePicture, fName, lName, activate, _id: id, phoneNumber, } = details
   const [loading, setLoading] = useState(false)

   const handleActivateAccount =  async(status:string) => {
      setLoading(true)
      try {
         const res  = await activateAccount({activate: status}, id)
      } catch (error:any) {
         Alert.alert(error)
      }finally{
         setLoading(false)
      }
   }
  return (
    <Pressable onPress={() => navigation.navigate('driver-details', {driverDetails:details})} style={[GLOBALSTYLES.row, styles.cardWrapper, {alignItems: 'flex-start', gap: 15}]}>
      <View style={[styles.imageContainer]}>
         <Image style={{width: '100%', height: '100%', borderRadius: 40}} source={profilePicture?.url ? {uri: profilePicture?.url} : require('@/assets/images/customer-icon.png')}/>
         <View style={{position: 'absolute', bottom: -5, right: -2}}><GreenThickIcon /></View>
      </View>
      <View style={{flex: 1}}>
         <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
            <View style={[GLOBALSTYLES.row, {gap:15}]}><ThemeText type='header' style={{fontSize: 16}}>{fName}</ThemeText><ThemeText type='primaryNormalText' style={{fontSize: 12}}><StarIcon /> {details?.driverRating ? Math.round(details?.driverRating) : 0 }</ThemeText></View>
            <Menu>
               <MenuTrigger style={[{gap: 10}]}>
                  <OptionsIcon />
               </MenuTrigger>
               <MenuOptions optionsContainerStyle={[styles.menu, {width: 185, borderRadius: 16}]}>
                  <MenuOption style={{paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5', paddingHorizontal: 20}} onSelect={() => navigation.navigate("add-driver", {edit: true, details: {phoneNumber, address: details?.address, emergencyContactName: details?.emergencyContactName, emergencyContactPhoneNumber: details?.emergencyContactPhoneNumber, id}})}>
                     <ThemeText type='primaryNormalText' style={{}}>Edit</ThemeText>
                  </MenuOption>
                  <MenuOption style={{paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5', paddingHorizontal: 20}} onSelect={() => navigation.navigate('driver-details', {driverDetails:details})}>
                     <ThemeText type='primaryNormalText' style={{}}>View profile</ThemeText>
                  </MenuOption>
                  <MenuOption style={{paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5', paddingHorizontal: 20}} onSelect={() => navigation.navigate(`fleet-listing`, {pageFrom: "ASIGNTODRIVER", driverInfo: {id, fName, lName, phoneNumber}})} >
                     <ThemeText type='primaryNormalText' style={{}}>Assign a car</ThemeText>
                  </MenuOption>
                  <MenuOption style={{paddingVertical: 12, paddingHorizontal: 20}} onSelect={() => alert(`Delete`)} >
                     <ThemeText type='primaryNormalText' style={{}}>Delete</ThemeText>
                  </MenuOption>
               </MenuOptions>
            </Menu>
         </View>
         <View style={[GLOBALSTYLES.row]}>
            <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>Car assigned: </ThemeText>
            <ThemeText type='header' style={{fontSize: 12}}> No car assigned</ThemeText>
         </View>
         <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between', marginTop: 16}]}>
            <ThemeText type='primaryNormalText' style={{fontSize: 12, color: '#FF8B00'}}>Available</ThemeText>
            <Menu>
               <MenuTrigger style={[GLOBALSTYLES.row, styles.cardBtn, {gap: 10}]}>
                  <ThemeText type='primaryNormalText' style={{fontSize: 12}}>{loading ? <ActivityIndicator /> : activate == "yes" ? "Activated" : "deactivated"}</ThemeText>
                  <ArrowDownIcon />
               </MenuTrigger>
               <MenuOptions optionsContainerStyle={[styles.menu, {borderRadius: 6}]}>
                  <MenuOption style={{paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => handleActivateAccount('yes')}>
                     <ThemeText type='primaryNormalText'>Activate</ThemeText>
                  </MenuOption>
                  <MenuOption style={{paddingHorizontal: 14, paddingVertical: 10}} onSelect={() => handleActivateAccount('no')}>
                     <ThemeText type='primaryNormalText'>Deactivate</ThemeText>
                  </MenuOption>
               </MenuOptions>
            </Menu>
            {/* <Pressable style={[GLOBALSTYLES.row]}><ThemeText type='primaryNormalText' style={{fontSize: 12}}>Activated</ThemeText><ArrowDownIcon /></Pressable> */}
         </View>
      </View>
    </Pressable>
  )
}

export default DriversCard

const styles = StyleSheet.create({
   cardBtn: {
      borderWidth: 0.5,
      borderColor: '#ABB3BF80',
      borderRadius: 40,
      paddingHorizontal: 16,
      paddingVertical: 8,
      width: 'auto'
   },
   cardWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: '#F4F4F4',
      paddingBottom: 28,
      marginBottom: 28
   },
   imageContainer: {
      width: 52,
      height: 52,
      borderRadius: 30
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