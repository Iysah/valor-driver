import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState} from 'react'
import { ArrowBack, AscentCalendarIcon, AscentLocatioonIcon, OptionsIcon } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Constants from 'expo-constants'
import ThemeLoadeerScreen from '@/components/ThemeLoadeerScreen'
import { COLORS } from '@/styles/colors'


// Define the type for a vehicle item
interface Vehicle {
    make: string;
    model: string;
    trim: string;
    image: string;
    location: Location;
    startDate: string;
    endDate: string;
    status: string;
}

// Define props type for the render item function
interface RenderItemProps {
    item: Vehicle;
}

// Types for image source handling
type ImageSource = {
[key: string]: any;
} | number;
  

const HistoryScreen = ({navigation}: {navigation: any}) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false)

    // Handle pull-to-refresh
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchVehicles();
    }, []);

    // Fetch vehicle data
    const fetchVehicles = async () => {
        try {
        // If data is stored locally
        const response = require('../data/history.json');
        
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
        
        /* For API endpoints, use this instead:
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        if (!data || !data.vehicles) {
            setError('No vehicle data available');
            setVehicles([]);
            return;
        }

        if (data.vehicles.length === 0) {
            setVehicles([]);
            return;
        }

        setVehicles(data.vehicles);
        setError(null);
        */
        } catch (err) {
        setError('Failed to fetch vehicle data');
        setVehicles([]);
        console.error('Error fetching vehicles:', err);
        } finally {
        setLoading(false);
        setRefreshing(false);
        }
    };

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
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TripDetails')}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10 }}>
            <Image
                source={getImageSource(item.image)}
                style={styles.vehicleImage}
                resizeMode="contain"
            />

            <View style={{ paddingTop: 10 }}>
                <Text style={styles.title}>{item.make} {item.model}</Text>
                <Text style={styles.date}>{item.startDate} - {item.endDate}</Text>
                <Text style={styles.status}>{item.status}</Text>
            </View>
        </View>

        <View style={{ backgroundColor: '#f4f4f4', height: 1, width: 'auto', marginTop: 16}} />
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
        <Text style={styles.noTripsText}>You don’t have any trip history yet. When you do they will appear here</Text>
        {/* <Text style={styles.noTripsText}>When you do they will appear here</Text> */}
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
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 16, paddingTop: 30 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowBack />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: '700', color: COLORS.light.primary }}>Trip History</Text>
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
                ListEmptyComponent={EmptyState}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 100,
      },
      emptyContainer: {
        flexGrow: 1,
      },
      tripImage: {
        width: 165,
        height: 165,
        alignSelf: 'center',
      },
      noTripsImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
      },
      noTripsText: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 16,
      },
      error: {
        color: 'red',
        fontSize: 16,
      },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        borderColor: '#f4f4f4',
        padding: 16,
        borderWidth: 1,
        marginBottom: 16,
      },
      vehicleImage: {
        width: 72,
        height: 85,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },
      details: {
        paddingVertical: 16,
        gap: 10,
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      trim: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
      },
      location: {
        fontSize: 14,
        color: '#444',
      },
      date: {
        fontSize: 14,
        color: '#666',
        // marginTop: 8,
      },
      status: {
        fontSize: 14,
        color: '#FF8B00',
        // marginTop: 8,
      },
      centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button : {
        borderColor: '#969696',
        borderRadius: 24,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 14,
        color: '#000'
      },
})