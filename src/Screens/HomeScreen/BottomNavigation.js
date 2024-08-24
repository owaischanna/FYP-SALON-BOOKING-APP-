import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons'; // Add more icons as needed

const BottomNavigation = ({ navigateToHome, navigateToBookings, navigateToProfile }) => {
  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity onPress={navigateToHome} style={styles.bottomNavItem}>
        <FontAwesomeIcon icon={faHome} size={24} color="#420475" />
        <Text style={styles.bottomNavItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToBookings} style={styles.bottomNavItem}>
        <FontAwesomeIcon icon={faCalendarAlt} size={24} color="#420475" />
        <Text style={styles.bottomNavItemText}>Appointments</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToProfile} style={styles.bottomNavItem}>
        <FontAwesomeIcon icon={faUser} size={24} color="#420475" />
        <Text style={styles.bottomNavItemText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  bottomNavItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomNavItemText: {
    color: '#420475',
    fontSize: 13,
    marginTop: 4,
  },
});

export default BottomNavigation;
