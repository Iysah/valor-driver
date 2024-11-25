import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowBack, AscentCalendarIcon2, FilterIcons } from '@/assets/icons/icon'
import { GLOBALSTYLES } from '@/styles/global-styles'
import { OptionsIcon } from '@/assets/icons/icon'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Constants from 'expo-constants'
import { COLORS } from '@/styles/colors'
import ThemeLoadeerScreen from '@/components/ThemeLoadeerScreen'
import { styles } from '@/styles/trips-styles';

// Define the type for a vehicle item
interface Request {
  type: string;
  vehicle: string;
  datetime: string;
  status: string;
}

// Define props type for the render item function
interface RenderItemProps {
  item: Request;
}

// Add this helper function before the renderRequestItem
const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return {
        backgroundColor: '#E2E4E5',
        textColor: '#667085'
      };
    case 'approved':
      return {
        backgroundColor: '#27A54E',
        textColor: '#fff'
      };
    case 'declined':
      return {
        backgroundColor: '#CC0A00',
        textColor: '#fff'
      };
    default:
      return {
        backgroundColor: '#F2F4F7',
        textColor: '#667085'
      };
  }
};

const TripRequest = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false)
  const [requests, setRequests] = useState<Request[]>([]);
      // Fetch vehicle data
  const fetchRequests = async () => {
    try {
    // If data is stored locally
    const response = require('../data/requests.json');
    
    // Check if response exists and has vehicles property
    if (!response || !response.requests) {
        setError('No request data available');
        setRequests([]);
        return;
    }

    // Check if vehicles array is empty
    if (response.requests.length === 0) {
        setRequests([]);
        return;
    }

    setRequests(response.requests);
    setError('');

    } catch (err) {
      setError('Failed to fetch request data');
      setRequests([]);
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Handle pull-to-refresh
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchRequests();
  }, []);

  useEffect(() => {
    fetchRequests();
}, []);
    
  const renderRequestItem = ({ item }: RenderItemProps): React.ReactElement => {
    const statusStyle = getStatusStyles(item.status);
    
    return (
      <TouchableOpacity style={styles.requestItem}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <View style={styles.requestIcon}>
            <AscentCalendarIcon2 />
          </View>
          <View>
            <Text style={styles.requestType}>{item.type}</Text>
            <Text style={styles.requestVehicle}>{item.vehicle}</Text>
            <Text style={styles.requestDatetime}>{item.datetime}</Text>
          </View>
        </View>

        <View style={{ 
          backgroundColor: statusStyle.backgroundColor, 
          paddingVertical: 4, 
          paddingHorizontal: 8, 
          borderRadius: 15 
        }}>
          <Text style={[
            styles.requestStatus, 
            { color: statusStyle.textColor }
          ]}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Empty state component
  const EmptyState = () => (
    <View style={{ gap: 20 }}>
        <Image
        style={styles.tripImage}
        source={require('../assets/images/empty-trip.png')}
        />

        <Text style={[styles.noTripsText, {fontSize: 20, fontWeight: '700', color: '#000' }]}>Oops</Text>

        <View>
        <Text style={styles.noTripsText}>You don't have any trip request yet.</Text>
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
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginHorizontal: 16, marginTop: 30 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 15 }} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowBack />
                </TouchableOpacity>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: COLORS.light.primary }}>Trip Request</Text>
                </View>

                <FilterIcons />
            </View>

            <FlatList
              data={requests}
              renderItem={renderRequestItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[
                styles.container,
                requests.length === 0 && styles.emptyContainer
              ]}
              ListEmptyComponent={EmptyState}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              style={[{ paddingTop: 20, backgroundColor: '#fff' }]}
            />
        </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default TripRequest
