import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeText from '../ThemeText'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { StarIcon } from '@/assets/icons/icon'
import { responsiveHeight } from '@/utils/sizeCalculator'

const {width, height} = Dimensions.get("screen")
const ReviewCard = ({data, variation}: {data:any, variation?: "SMALL" | "MEDIUM" | "LARGE"}) => {
  return (
   <View style={[GLOBALSTYLES.row, {gap: 14, alignItems: 'flex-start', paddingHorizontal: 14, paddingVertical: 10, width:variation == "SMALL" ? width*0.7 : "100%"}]}>
      <Image style={[styles.dpImage]} source={data?.customerId?.profilePicture ? {uri: data?.customerId?.profilePicture?.url} : require('@/assets/images/customer-icon.png')} />
      <View style={{flex: 1}}>
         <ThemeText type='header' style={{fontSize: responsiveHeight(14)}}>{data?.customerId?.fName}</ThemeText>
         <View style={[GLOBALSTYLES.row, {gap: 2, marginTop: 5}]}>
            {
               [1,2,3,4,5].map((star, idx) => ( <View key={idx}><StarIcon color={star > data?.rating ? "#D8D8D8" : "#FB8500"} /></View> ))
            }
         </View>
         <ThemeText type='primaryNormalText' style={{fontSize: 12, marginTop: 10}}>{data?.review}</ThemeText>
      </View>
   </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
   dpImage: {
      width: 48,
      height: 48,
      borderRadius: 25
   }
})