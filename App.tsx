import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/auth/login';
import Verification from './screens/auth/verify';
import HomeScreen from '@/screens/home';
import Trips from './screens/trips';
import TripRequest from './screens/tripRequest';
import Notifications from './screens/notifications';
import Privacy from './screens/privacy';
import Terms from './screens/terms';
import HistoryScreen from './screens/history';
import TripDetails from './screens/tripDetails';
import Profile from './screens/profile';
import { AuthProvider } from '@/context/AuthContext';

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <NavigationContainer>
          <StatusBar style='dark' backgroundColor='#fff'/>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name="Login" 
              component={Login} 
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Verify'
              component={Verification}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Home'
              component={HomeScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Trips'
              component={Trips}  
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='TripDetails'
              component={TripDetails}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='History'
              component={HistoryScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Profile'
              component={Profile}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Trip-requests'
              component={TripRequest}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Notifications'
              component={Notifications}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Privacy'
              component={Privacy}
            />
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='Terms-and-conditions'
              component={Terms}
            />

        </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider >
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
