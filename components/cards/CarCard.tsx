import { ActivityIndicator, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ThemeText from '../ThemeText'
import { FavIcon, SendLocationIcon, StarIcon, WhiteFav } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { responsiveHeight } from '@/utils/sizeCalculator'
import { formatCurrency } from '@/utils/format-currency'
import { CarDetails } from '@/screens/host'
import { addToFavorite } from '@/api/customer/car-search'
import { showToast } from '@/utils/toast'

const {width, height} = Dimensions.get("screen")
const CarCard = ({variation, data}:{variation: "SMALL" | "LARGE", data:any}) => {
   const navigation= useNavigation()
   const [adding, setAdding] = React.useState(false)

   const addToFav = async (id:string) => {
      setAdding(true)
      try {
         const res = await addToFavorite(id)
         showToast(res.data?.message)
      } catch (error) {
         showToast("Has Already been added to your fav.")
      }finally{
         setAdding(false)
      }
   }
  return (
   <View style={[variation == "LARGE" ? styles.procard : styles.miniCard, {backgroundColor: '#fff'}]}>
      <Pressable onPress={() => addToFav(data?.id)} style={[styles.favButton, GLOBALSTYLES.center]}>{adding ? <ActivityIndicator /> : <WhiteFav /> }</Pressable>
      <Image style={[styles.miniCardImg, {width: '100%', height: variation == "LARGE" ? width/2 : 175*0.60, borderTopLeftRadius: 12, borderTopRightRadius: 12,}]} source={data?.carImages?.frontView?.url ? {uri: data?.carImages?.frontView?.url} : require('@/assets/images/placeholder.png')} />
      {
         variation == "LARGE" ? (
            <View  style={{padding: 10}}>
               <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
                  <ThemeText type='header' style={{fontSize: 16}}>{data?.carDetails?.carMake} {data?.carDetails?.carModel}</ThemeText>
                  <View style={[GLOBALSTYLES.row, {gap: 3, backgroundColor: '#F1FAFF', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 53 }]}>
                     <ThemeText type='header' style={{fontSize: 12}}>4.8</ThemeText>
                     <StarIcon />
                  </View>
               </View>
               <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
                  <View style={[GLOBALSTYLES.row, {gap: 3}]}>
                     <SendLocationIcon />
                     <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>{data?.carDetails?.city}, Nigeria</ThemeText>
                  </View>

                  <View style={[GLOBALSTYLES.row, {alignItems: 'baseline', justifyContent: 'center', alignSelf: 'center' }]}>
                     <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>From</ThemeText>
                     <ThemeText type='header' style={{fontSize: 15, marginLeft: 6, }}>N{formatCurrency(data?.pricing?.hourly?.cost)}</ThemeText>
                     <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>/Day</ThemeText>
                  </View>
               </View>
            </View>
         ): variation == "SMALL" ? (
            <View style={{padding: 10}}>
               <ThemeText numberOfLines={1} type='header' style={{fontSize: 14}}>{data?.carDetails?.carMake} {data?.carDetails?.carModel}</ThemeText>
               <View style={[GLOBALSTYLES.row, {alignItems: 'baseline', }]}>
                  <ThemeText type='header' style={{fontSize: 12}}>N{formatCurrency(data?.pricing?.fullDay?.cost)}</ThemeText>
                  <ThemeText type='secondaryNormalText' style={{fontSize: 12}}>/Day</ThemeText>
               </View>

               <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between'}]}>
                  <View style={[GLOBALSTYLES.row, {gap: 3}]}>
                     <SendLocationIcon />
                     <ThemeText type='secondaryNormalText' style={{fontSize: 10}}>{data?.carDetails?.city}, Nigeria</ThemeText>
                  </View>

                  <View style={[GLOBALSTYLES.row, {gap: 3}]}>
                     <ThemeText type='header' style={{fontSize: 10}}>4.8</ThemeText>
                     <StarIcon />
                  </View>
               </View>
            </View>
         ):null
      }
   </View>
  )
}

export default CarCard

const styles = StyleSheet.create({
   procard: {
      width: '100%',
      marginBottom: responsiveHeight(20),
      borderWidth: 1,
      borderColor: '#F4F4F4',
      borderRadius: 12
    },
    miniCard: {
      width: 200,
      gap: 0,
      borderWidth: 1,
      borderColor: '#F4F4F4',
      borderRadius: 12
    },
    miniCardImg: {
      height: 120
    },
    favButton: {
      position: 'absolute',
      right: 15,
      top: 15,
      zIndex: 1000,
      width: 32,
      height: 32,
      borderRadius: 15,
      backgroundColor: '#00000099'
    }
})