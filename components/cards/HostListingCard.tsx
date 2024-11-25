import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AscentCalendarIcon2, AscentClock, AscentFileIcon, AscentLocation, AscentPeopleIcon, AscentPointer, SedanIcon, SuvIcon, VanIcon } from '@/assets/icons/icon'
import ThemeText from '../ThemeText'
import { GLOBALSTYLES } from '@/styles/global-styles'
import ThemeButton from '../ThemeButton'
import { getTimeDifference } from '@/utils/time-diff'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const HostListingCard = ({data}:{[key:string]: any}) => {
   type RootStackParamList = {
      'host-list-details': { jobId: string };
    };
   type ListingDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'host-list-details'>;
   const navigation= useNavigation<ListingDetailsNavigationProp>()
   const Divider = () => {
      return <View style={{height: 2, width: '100%', marginVertical: 16, backgroundColor: '#F4F4F4'}}/>
    }

  return (
    <View style={{padding: 16, borderWidth: 1, borderColor: '#ebebeb', marginBottom: 24, borderRadius: 24}}>
      <View style={[GLOBALSTYLES.row, {gap: 16}]}>
         <View style={[styles.iconWrapper, GLOBALSTYLES.center]}><SuvIcon color={'#fff'} w={30} h={30} /></View>
         <View>
            <ThemeText type='header' style={{fontSize: 16}}>{data?.carType}</ThemeText>
            <ThemeText type='secondaryNormalText' style={{fontSize: 10}}>{getTimeDifference(data?.createdAt)}</ThemeText>
         </View>
      </View>

      <Divider />
         <View style={{gap: 15}}>
            <View style={[GLOBALSTYLES.row, {gap: 10}]}>
               <AscentPointer />
               <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>{data?.pickUpLocation?.address}</ThemeText>
            </View>

            <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
               <View style={[GLOBALSTYLES.row, {gap: 10}]}>
                  <AscentLocation />
                  <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>{data?.state} State</ThemeText>
               </View>

               <View style={[GLOBALSTYLES.row, {gap: 10}]}>
                  <AscentCalendarIcon2 />
                  <ThemeText type='secondaryNormalText' style={{fontSize: 12}}> 23rd June 2024:</ThemeText>
               </View>
            </View>
            
            <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
               <View style={[GLOBALSTYLES.row, {gap: 10}]}>
                  <AscentClock />
                  <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>Duration: {data?.numberOfDays}</ThemeText>
               </View>

               <View style={[GLOBALSTYLES.row, {gap: 10}]}>
                  <AscentFileIcon />
                  <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>Job type: {data?.tripType}</ThemeText>
               </View>
            </View>

            <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
               <View style={[GLOBALSTYLES.row, {gap: 10}]}>
                  <AscentPeopleIcon />
                  <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>No of applicants: {data?.numberOfQuotes}</ThemeText>
               </View>
            </View>
         </View>

      <Divider />

      <ThemeButton onPress={() => navigation.navigate("host-list-details", {jobId: data?._id})} type='OUTLINED' height={39}>See Details</ThemeButton>
    </View>
  )
}

export default HostListingCard

const styles = StyleSheet.create({
   iconWrapper: {
      backgroundColor: '#FF8B00',
      width: 50,
      height: 50,
      borderRadius: 40
   }
})