import { GLOBALSTYLES } from '@/styles/global-styles';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch,  KeyboardAvoidingView, ScrollView, ActivityIndicator, FlatList, RefreshControl, Dimensions, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { AscentCalendarIcon, AscentLocatioonIcon, DriverMenu, EmptyTrip, FleetIcon, HostTripIcon, InfoIcon, LocationIcon, LogoutIcon, Papper, Profile, Settings, } from '@/assets/icons/icon';
import ThemeLoadeerScreen from '@/components/ThemeLoadeerScreen';
import { styles } from '@/styles/home-styles';
import { useAuth } from '@/context/AuthContext';
import { ENDPOINTS } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for image source handling
type ImageSource = {
  [key: string]: any;
} | number;

interface Location {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// Define the type for a vehicle item
interface Vehicle {
  make: string;
  model: string;
  trim: string;
  image: string;
  location: Location;
  date: string;
}
// Define props type for the render item function
interface RenderItemProps {
  item: Vehicle;
}
interface Menus {
  icon?: JSX.Element;   
  title: string;
  url: string;
}

interface RenderPagesProps {
  pages: Menus[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { user, logout, } = useAuth();
  const [showEmptyState, setShowEmptyState] = useState(false)
  const slideAnim = useState(new Animated.Value(-MENU_WIDTH))[0];
  const [isCarOnline, setIsCarOnline] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false)
  const [carAssigned, setCarAssigned] = useState<string | null>(null);

  const toggleMenu = () => {
    const toValue = menuOpen ? -MENU_WIDTH : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const toggleCarStatus = () => {
    setIsCarOnline(!isCarOnline);
  };

  // Fetch vehicle data
  const fetchVehicles = async () => {
    try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('userToken');

        // Check if token exists
        if (!token) {
            setError('Authentication token is missing');
            setLoading(false);
            return;
        }
  
        // Make API call with the token in the Authorization header
        const response = await fetch(ENDPOINTS.GET_ACTIVE_TRIPS, {
          method: 'GET', // Specify the HTTP method (GET in this case)
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', // Optional if you need this header
          },
      });
  
      // Check if response is unauthorized
      if (response.status === 401) {
        setError('Session expired. Please login again.');
        logout(); // Assuming you have a logout function in your auth context
        return;
      }
  
      const data = await response.json();
      
      console.log('API Response:', data);
      // Rest of your existing code...
      if (!data.status) {
        // setError(data.message || 'No active trips available');
        setShowEmptyState(true);
        setVehicles([]);
        return;
      }

      // If status is true, then check for vehicles data
      if (!data.vehicles || data.vehicles.length === 0) {
        setVehicles([]);
        setShowEmptyState(true);
        return;
      }

      setVehicles(data.vehicles);
      setError(null);
      
    } catch (err) {
      setError('Unable to fetch trips. Please try again later.');
      setVehicles([]);
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch user data
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setError('Authentication token is missing');
        return;
      }

      const response = await fetch(ENDPOINTS.GET_USER_DETAILS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        setError('Session expired. Please login again.');
        logout();
        return;
      }

      const userData = await response.json();
      console.log('User Data:', userData);
      
      // Set carAssigned based on userData
      setCarAssigned(userData.carAssigned || null); // Adjust according to your user data structure

    } catch (err) {
      setError('Unable to fetch user data. Please try again later.');
      console.error('Error fetching user:', err);
    }
  };

  const pages: Menus[] = [
    { icon: <Profile />, title: 'Profile', url: 'Profile' },
    { icon: <FleetIcon/>, title: 'History', url: 'History' },
    { icon: <HostTripIcon/>, title: 'Trips', url: 'Trips' },
    { icon: <Papper />, title: 'Trip Requests', url: 'Trip-requests' },
    { icon: <Settings />, title: 'Notifications', url: 'Notifications' },
    { icon: <InfoIcon color='#fff' />, title: 'Privacy', url: 'Privacy' },
    { icon: <InfoIcon color='#fff' />, title: 'Terms and conditions', url: 'Terms-and-conditions' },
  ];

  // Handle pull-to-refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchVehicles();
    fetchUser(); // Call fetchUser to get user data
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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripDetails')}> 
        <Text style={{ color: '#000', textAlign: 'center'}}>View details </Text>
      </TouchableOpacity>

    </TouchableOpacity>
  )};

    // Empty state component
  const EmptyState = () => (
    showEmptyState ? (
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
  ) : null
  );
  
  if(loading) return <ThemeLoadeerScreen />

  return (
    <SafeAreaProvider style={{ backgroundColor: '#fff', position: 'relative', paddingTop: Constants.statusBarHeight }}>
      <Animated.View
        style={[
          styles.sideMenu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.sideMenu}>
          <View style={styles.profileCard}>
            <Image 
              source={{ uri: user?.profilePicture.url }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileCardName}>{user?.fName} {user?.lName}</Text>
              <Text style={styles.vehicleId}>{carAssigned ? carAssigned : 'No car assigned'}</Text>
              {user?.adminApproval.status === 'pending' ? (
              <View style={styles.carStatus}>
                <Text style={styles.carStatusText}>Account status: {user?.adminApproval.status}</Text>
              </View>
            ) : (
              <View style={styles.menuStatus}>
                <Text style={{ color: '#fff', fontSize: 12 }}>{isCarOnline ? 'Currently online' : 'Currently offline'}</Text>
              </View>
            )}

            </View>
          </View>
          <View style={{ borderTopWidth: .5, borderBottomWidth: .5, borderColor: '#ffffff46', marginHorizontal: 10 }}>
            {pages.map((page, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.menuItem} 
                onPress={() => {
                  toggleMenu(); // Close the menu first
                  setTimeout(() => {
                    navigation.navigate(page.url);
                  }, 300); // Wait for menu animation to complete
                }}
              >
                <View style={styles.menuIcon}>
                  {page.icon}
                </View>
                <Text style={styles.menuText}>{page.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LogoutIcon color='#fff' />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {menuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}

      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10} style={[GLOBALSTYLES.container]}>
        <ScrollView showsVerticalScrollIndicator={false} style={[GLOBALSTYLES.wrapper, { backgroundColor: '#fff' }]}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello {user?.fName}</Text>
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
              <DriverMenu />
            </TouchableOpacity>
          </View>

          <View style={styles.carInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.carInfoText}>Car assigned: </Text>
              <Text>{carAssigned ? carAssigned : 'No car assigned'}</Text>
            </View>

            {user?.adminApproval.status === 'pending' ? (
              <View style={styles.carStatus}>
                <Text style={styles.carStatusText}>Account status: {user?.adminApproval.status}</Text>
              </View>
            ) : (
              <View style={styles.carStatus}>
                <Text style={styles.carStatusText}>{isCarOnline ? 'Currently online' : 'Currently offline'}</Text>
                <Switch value={isCarOnline} onValueChange={toggleCarStatus} />
              </View>
            )}
          </View>

          <View style={styles.upcomingTrips}>
            <Text style={styles.upcomingTripsTitle}>Upcoming Trips</Text>
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
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};



export default HomeScreen;

