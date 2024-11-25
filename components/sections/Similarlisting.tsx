import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SearchCarFilter, getRecentlyViewed, getTopPicks } from '@/api/customer/car-search'
import ThemeText from '../ThemeText'
import { SendLocationIcon, StarIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CarCard from '../cards/CarCard'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const {width, height} = Dimensions.get("screen")
const Similarlisting = ({callback, cartype, carmake}:any) => {
   const [laoding, setLoading] = React.useState(false)
   const [listings, setListing] = React.useState([])
   type RootStackParamList = {
      "driver-profil": { id: string };
    };
   type ListingDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, "driver-profil">;
   const navigation= useNavigation<ListingDetailsNavigationProp>()

   const carSearch = async () => {
      setLoading(true)
      const params:{ [key: string]: any } = {
         page: 1,
         limit: 5,
      }
      if(cartype){
         params['carType'] = cartype
      }
      if(carmake){
         params['carDetails.carMake'] = carmake
      }
      try {
         const response = await SearchCarFilter(params)
         setListing(response?.data?.data)
      } catch (error:any) {
      }finally{
         setLoading(false)
      }
   }

   React.useEffect(() => {
      carSearch()
   },[])
  return (
    <View>
      {
         listings ? (
            <FlatList
               data={[...listings]}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{gap: 15}}
               renderItem={({item}:any) => (
                  <Pressable onPress={() => callback(item?.id)}>
                     <CarCard variation='SMALL' data={item} />
                  </Pressable>
               )}
      
               ListEmptyComponent={() => (
                  <View>
                     <Text>no Similar car to this.</Text>
                  </View>
               )}
            />
         ):(
            <View>
               <Text>No Similar car to this.....</Text>
            </View>
         )
      }
    </View>
  )
}

export default Similarlisting

const styles = StyleSheet.create({
   vehicleCards: {
      width: width*0.4,
      gap: 10,
    },
})