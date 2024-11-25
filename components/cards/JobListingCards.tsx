import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemeText from '../ThemeText'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { convertIosString } from '@/utils/change-dateto-string'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const JobListingCards = ({data, type, index, length}:any) => {
   type RootStackParamList = {
      'host-list-details': { jobId: string };
      'qoute-list':{jobId:string, cartype: string, itinerary: string}
    };
   type ListingDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'host-list-details', 'qoute-list'>;
   const navigation= useNavigation<ListingDetailsNavigationProp>()

  return (
    <View style={{marginBottom: index ? index == length -1 ? 120 : 0 : 0}}>
      <TouchableOpacity onPress={() => type == "USER" ? navigation.navigate("qoute-list", {jobId: data?._id, cartype: data?.carType, itinerary: data?.itinerary}) : navigation.navigate("host-list-details", {jobId: data?._id})} style={[styles.wrapper]}>
         <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
            <ThemeText type='header' style={{fontSize: 16}}>{data?.carType}</ThemeText>
            <View style={[type == "USER" ? styles.userBadge : styles.badge, GLOBALSTYLES.center]}><ThemeText type='labelText'>{data?.numberOfDays}</ThemeText>{type == "USER" && <ThemeText type='labelText'> Bids</ThemeText>}</View>
         </View>
         <View>
            <ThemeText type='primaryNormalText'>{data?.itinerary}</ThemeText>
         </View>
         <View style={{alignItems: type == "USER" ? 'flex-start' : 'flex-end'}}>
            <ThemeText type='secondaryNormalText' style={{fontSize: 10}}>posted on {convertIosString(data?.createdAt)}</ThemeText>
         </View>
      </TouchableOpacity>
    </View>
  )
}

export default JobListingCards

const styles = StyleSheet.create({
   wrapper: {
      gap: 8,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 20
   },
   badge: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#FCCD56'
   },
   userBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 22,
      backgroundColor: '#FCCD56',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 3
   }
})