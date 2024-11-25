import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { ArrowBack } from '@/assets/icons/icon'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { OptionsIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import Constants from 'expo-constants'

const TripDetails = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight }}>
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10} style={[GLOBALSTYLES.container]}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingTop: 30, backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 16, width: '100%'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowBack />
                </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#000' }}>Itenary Details</Text>
                </View>

                <OptionsIcon />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={[GLOBALSTYLES.wrapper, { backgroundColor: '#f4f4f4' }]}>
                <View style={{ backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 20, marginVertical: 20}}>
                    <Text style={styles.detailValue}>Get help or contact customer service</Text>
                </View>

                <View style={styles.carCard}>
                    <View style={styles.carImageContainer}>
                        <Image source={require("../assets/images/car.png")} style={styles.carImage} />
                    </View>
                    <View style={styles.carInfo}>
                        <Text style={styles.carName}>Toyota Corolla</Text>
                        <Text style={styles.carModel}>XL720LSR</Text>
                        <Text style={styles.carPrice}>N50K/day</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>4.8 ★</Text>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Trips Details</Text>
                    
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Job type</Text>
                        <Text style={styles.detailValue}>Full day</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <View>
                            <Text style={styles.detailValue}>July 1, 2, 4, 9, 2022</Text>
                            <Text style={styles.detailValue}>August 1, 2, 4, 9, 2022</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Duration</Text>
                        <Text style={styles.detailValue}>23 days</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Pick up time</Text>
                        <Text style={styles.detailValue}>8:00am</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Closing time</Text>
                        <Text style={styles.detailValue}>8:00am</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Pick up address</Text>
                        <Text style={styles.detailValue}>3817, Edwards Rd Cedar Hill, Vermont 82149</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Itinerary</Text>
                        <View>
                            {Array(4).fill('3817, Edwards Rd Cedar Hill, Vermont 82149').map((address, index) => (
                                <Text key={index} style={[styles.detailValue, { marginBottom: 8, lineHeight: 20 }]}>{address}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default TripDetails

const styles = StyleSheet.create({
    carCard: {
        backgroundColor: '#1B3358',
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    carImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
    },
    carImage: {
        width: '100%',
        height: '100%',
    },
    carInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    carName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    carModel: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
    },
    carPrice: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
    },
    ratingContainer: {
        backgroundColor: '#E5F6FF',
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        marginTop: 8,
    },
    rating: {
        color: '#000',
        fontSize: 13,
        fontWeight: '700',
    },
    detailsContainer: {
        gap: 20,
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: 24,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    detailItem: {
        gap: 8,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '400',
        color: '#666',
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000',
        // marginBottom: 4,
    },
})