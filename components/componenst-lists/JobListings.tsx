import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import JobListingCards from '../cards/JobListingCards'
import { getAllCustomerJobListings, getAllJobListings } from '@/api/host/job-listing'
import { COLORS } from '@/styles/colors'


const JobListings = ({type}:any) => {
   const [loading, setLoading] = React.useState(false)
   const [listings, setListings] = React.useState([])
   const fetJobLisitngs = async () => {
      setLoading(true)
      try {
         const res = type == "USER" ? await getAllCustomerJobListings() : await getAllJobListings()
         setListings(res.data?.data)
      } catch (error) {
         
      }finally{
         setLoading(false)
      }
   }
   useEffect(() => {
      fetJobLisitngs()
   },[])

   const sortedItems = listings.sort((a:any, b:any) => {
      const closeDateA = new Date(a?.createdAt).getTime();
      const closeDateB = new Date(b?.createdAt).getTime();
      return closeDateB - closeDateA;
  });

  return (
    <View style={{marginBottom: 0}}>
      {
         loading && <View style={{marginTop: 20}}><ActivityIndicator color={COLORS.light.primary} /></View>
      }
      <FlatList 
         style={{marginTop: 25}}
         data={[...sortedItems]}
         showsVerticalScrollIndicator={false}
         renderItem={({item, index}) => (<JobListingCards index={index} length={sortedItems.length} type={type} data={item} />)}
      />
    </View>
  )
}

export default JobListings

const styles = StyleSheet.create({})