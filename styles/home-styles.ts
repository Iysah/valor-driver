import { Dimensions, StyleSheet } from "react-native";
import Constants from 'expo-constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    greeting: {
      fontSize: 20,
      fontWeight: '700',
    },
    menuButton: {
      // Add button styles here
    },
    carInfo: {
      marginBottom: 20,
    },
    carInfoText: {
      fontSize: 12,
      fontWeight: 400,
      color: '#969696',
    },
    carStatus: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    carStatusText: {
      marginRight: 10,
      fontSize: 14,
      color: '#969696',
    },
    menu: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: MENU_WIDTH,
      backgroundColor: '#012340',
      zIndex: 2,
    },
    menuHeader: {
      padding: 20,
    },
    closeButton: {
      position: 'absolute',
      right: 20,
      top: 20,
      zIndex: 3,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 20,
    },
    profileSection: {
      marginTop: 30,
      alignItems: 'flex-start',
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#2A4359',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    profileImageText: {
      color: '#fff',
      fontSize: 18,
    },
    profileName: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    vehicleInfo: {
      color: '#8D9BA8',
      fontSize: 14,
      marginBottom: 10,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#4CAF50',
      marginRight: 8,
    },
    statusText: {
      color: '#4CAF50',
      fontSize: 14,
    },
    menuItems: {
      flex: 1,
      paddingTop: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      // borderBottomWidth: 1,
      // borderBottomColor: '#2A4359',
    },
    menuItemIcon: {
      marginRight: 16,
      fontSize: 18,
      color: '#fff',
    },
    menuItemText: {
      color: '#fff',
      fontSize: 16,
    },
    emptyContainer: {
      flexGrow: 1,
    },
    upcomingTrips: {
      marginTop: 30,
      // alignItems: 'center',
    },
    tripImgContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tripImage: {
      width: 165,
      height: 165,
      alignSelf: 'center',
    },
    upcomingTripsTitle: {
      textAlign: 'left',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
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
    card: {
      backgroundColor: 'white',
      borderRadius: 24,
      borderColor: '#f4f4f4',
      padding: 16,
      borderWidth: 1,
      marginBottom: 16,
    },
    vehicleImage: {
      width: 70,
      height: 65,
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
    error: {
      color: 'red',
      fontSize: 16,
    },
    sideMenu: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: MENU_WIDTH,
      backgroundColor: '#023047',
      zIndex: 2,
      paddingTop: Constants.statusBarHeight + 20,
    },
    sideMenuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    menuIcon: {
      fontSize: 20,
      marginRight: 10,
    },
    menuText: {
      fontSize: 16,
      color: '#fff',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1,
    },
    profileCard: {
      padding: 16,
      marginBottom: 16,
      width: '100%',
    },
    profileInfo: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    profileCardImage: {
      width: 100,
      height: 100,
      borderRadius: 30,
      marginRight: 16,
    },
    profileDetails: {
      // flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    profileCardName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#ffff',
      marginBottom: 4,
    },
    vehicleId: {
      fontSize: 14,
      fontWeight: '400',
      color: '#fff',
      marginBottom: 4,
    },
    menuStatus: {
      backgroundColor: '#1A4231',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      marginTop: 10,
    },
    logoutButton: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,  // This will push the button to the bottom
      marginHorizontal: 20,
    },
    logoutText: {
      color: '#fff',
      // textAlign: 'center',
      fontWeight: '600',
    },
  });
