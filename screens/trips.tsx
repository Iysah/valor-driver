import { FlatList, KeyboardAvoidingView, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GLOBALSTYLES } from '@/styles/global-styles'
import Constants from 'expo-constants';
import { styles } from '@/styles/trips-styles';
import { ArrowBack, ArrowleftIcon, AscentCalendarIcon, AscentLocatioonIcon, FilterIcons, OptionsIcon } from '@/assets/icons/icon';
import ThemeLoadeerScreen from '@/components/ThemeLoadeerScreen';
import { COLORS } from '@/styles/colors';

// Define the type for a vehicle item
interface Vehicle {
  make: string;
  model: string;
  trim: string;
  image: string;
  location: Location;
  date: string;
}
interface Location {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

type ImageSource = {
  [key: string]: any;
} | number;

  
// Define props type for the render item function
interface RenderItemProps {
    item: Vehicle;
}

const Trips = ({ navigation }: { navigation: any }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false)
    

    // Fetch vehicle data
    const fetchVehicles = async () => {
        try {
        // If data is stored locally
        const response = require('../data/trips.json');
        
        // Check if response exists and has vehicles property
        if (!response || !response.vehicles) {
            setError('No vehicle data available');
            setVehicles([]);
            return;
        }

        // Check if vehicles array is empty
        if (response.vehicles.length === 0) {
            setVehicles([]);
            return;
        }

        setVehicles(response.vehicles);
        setError('');

        } catch (err) {
        setError('Failed to fetch vehicle data');
        setVehicles([]);
        console.error('Error fetching vehicles:', err);
        } finally {
        setLoading(false);
        setRefreshing(false);
        }
    };
        // Handle pull-to-refresh
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchVehicles();
    }, []);

    useEffect(() => {
        fetchVehicles();
    }, []);

    // Create an image mapping object
    const imageMapping: { [key: string]: any } = {
        'toyota-corolla': require("../assets/images/car.png"),
        // Add more image mappings as needed
    };

  // Render each vehicle item
  const renderVehicleItem =({ item }: RenderItemProps): React.ReactElement => {
      // Function to get the correct image source
  const getImageSource = (imagePath: string): ImageSource => {
    if (imagePath.startsWith('http')) {
      return { uri: imagePath };
    }
    // Get image from mapping or return a default image
    return imageMapping[imagePath] || require('../assets/images/car.png');
  };
    return (
    <TouchableOpacity style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10 }}>
        <Image
          source={getImageSource(item.image)}
          style={styles.vehicleImage}
          resizeMode="contain"
        />

        <View style={{ paddingTop: 10 }}>
          <Text style={styles.title}>{item.make} {item.model}</Text>
          <Text style={styles.trim}>{item.trim}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#f4f4f4', height: 1, width: 'auto', marginTop: 16}} />

      <View style={styles.details}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 5,  }}>
          <AscentCalendarIcon />
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <AscentLocatioonIcon />
          <Text style={styles.location}>
          {item.location.street}, {item.location.city}
           {item.location.state} {item.location.zipCode}
          </Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#f4f4f4', height: 1, width: 'auto', marginBottom: 16}} />

      <TouchableOpacity style={styles.button}> 
        <Text style={{ color: '#000', textAlign: 'center'}}>View details </Text>
      </TouchableOpacity>

    </TouchableOpacity>
  )};
  
    // Empty state component
    const EmptyState = () => (
    <View style={{ gap: 20 }}>
        <Image
        style={styles.tripImage}
        source={require('../assets/images/empty-trip.png')}
        />

        <Text style={[styles.noTripsText, {fontSize: 20, fontWeight: '700', color: '#000' }]}>Oops</Text>

        <View>
        <Text style={styles.noTripsText}>You have no upcoming trip at the moment.</Text>
        <Text style={styles.noTripsText}>When you do they will appear here</Text>
        </View>
    </View>
    );

    if(loading) return <ThemeLoadeerScreen />

    if (error) {
    return (
        <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        </View>
    );
    }
      
  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10} style={[GLOBALSTYLES.container]}>
          <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingTop: 30, backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 16, width: '100%'}}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowBack />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.light.primary }}>Trips</Text>
              </View>
              <OptionsIcon />
          </View>

          <FlatList
            data={vehicles}
            renderItem={renderVehicleItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={[
              styles.container,
              vehicles.length === 0 && styles.emptyContainer
            ]}
            ListHeaderComponent={() => (
              <View style={[styles.upcomingTrips]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  <Text style={styles.upcomingTripsTitle}>Upcoming Trips</Text>
                  <FilterIcons />
                </View>
              </View>
            )}
            ListEmptyComponent={EmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            style={[GLOBALSTYLES.wrapper, { backgroundColor: '#fff' }]}
          />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default Trips
