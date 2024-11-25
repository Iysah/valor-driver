import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';

interface Menus {
  icon: string;
  title: string;
}

interface RenderPagesProps {
  pages: Menus[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

export const SideMenu: React.FC<RenderPagesProps> = ({ pages }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const slideAnim = useState(new Animated.Value(-MENU_WIDTH))[0];

  const toggleMenu = (): void => {
    const toValue = menuOpen ? -MENU_WIDTH : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemPress = (item: Menus): void => {
    console.log(`Navigating to ${item.title}`);
    toggleMenu();
  };

  // Profile section component for better organization
  const ProfileSection: React.FC = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileImage}>
        <Text style={styles.profileImageText}>OA</Text>
      </View>
      <Text style={styles.profileName}>Oketola Ahmen</Text>
      <Text style={styles.vehicleInfo}>Lexus 360 - MKV-123-YYT</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Currently available</Text>
      </View>
    </View>
  );

  // Menu items component that accepts pages prop
  const MenuItems: React.FC<RenderPagesProps> = ({ pages }) => (
    <View style={styles.menuItems}>
      {pages.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => handleMenuItemPress(item)}>
          <Text style={styles.menuItemIcon}>{item.icon}</Text>
          <Text style={styles.menuItemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {/* Sliding Menu */}
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}>
        <View style={styles.menuHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <ProfileSection />
        </View>

        <MenuItems pages={pages} />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleMenuItemPress({ icon: '↪', title: 'Logout' })}>
          <Text style={styles.logoutIcon}>↪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    menuButton: {
      padding: 8,
    },
    menuButtonText: {
      fontSize: 24,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 16,
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
      borderBottomWidth: 1,
      borderBottomColor: '#2A4359',
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
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#2A4359',
    },
    logoutIcon: {
      marginRight: 16,
      fontSize: 18,
      color: '#fff',
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
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
  });