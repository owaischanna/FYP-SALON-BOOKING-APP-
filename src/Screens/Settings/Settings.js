import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Settings = () => {
  const navigation=useNavigation();
  // Function to handle logout
  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePaswordScreen");
  };
  const handleAccountDetails = () => {
    navigation.navigate("EditAccountDetailsScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingItem} onPress={handleAccountDetails}>
        <Text style={styles.settingText}>Edit Account Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
        <Text style={styles.settingText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Update Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleProfile}>
        <Text style={styles.logoutButtonText}>Back to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#420475',
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;
