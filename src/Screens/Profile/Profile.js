import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const Profile = () => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Attempt to retrieve userData from route params
        const { userData } = route.params || {};

        if (userData) {
          // If userData is available, save it to AsyncStorage and set it to state
          const { Email, FullName, UserType } = userData;
          const userInfoToSave = { Email, FullName, UserType };
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfoToSave));
          setUserInfo(userInfoToSave);
          console.log('Saved new user info to AsyncStorage:', userInfoToSave);
        } else {
          // Otherwise, fetch the user data from AsyncStorage
          const savedUser = await AsyncStorage.getItem('userInfo');
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            console.log('Fetched user info from AsyncStorage:', parsedUser);
            setUserInfo(parsedUser);
          } else {
            console.log('No user info found in AsyncStorage.');
          }
        }
      } catch (e) {
        console.error('Failed to fetch or save user data:', e);
      }
    };

    fetchUserInfo();
  }, [route.params]); // Dependency array includes route.params

  // const handleLogout = async () => {
  //   try {
  //     // Clear AsyncStorage and reset userInfo state
  //     await AsyncStorage.removeItem('userInfo');
  //     await AsyncStorage.removeItem('authToken');
  //     setUserInfo(null);
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     console.error('Failed to clear AsyncStorage during logout:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        {userInfo ? (
          <>
            <Image source={require('../../../assets/person.png')} style={styles.avatar} />
            <Text style={styles.name}>{userInfo.FullName}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      <TouchableOpacity style={styles.profileItem} onPress={() => setShowAccountInfo(!showAccountInfo)}>
        <Text style={styles.profileItemText}>Account Information</Text>
      </TouchableOpacity>

      {showAccountInfo && userInfo && (
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountInfoText}>Name: {userInfo.FullName}</Text>
          <Text style={styles.accountInfoText}>Email: {userInfo.Email}</Text>
          <Text style={styles.accountInfoText}>User Type: {userInfo.UserType}</Text>
        </View>
      )}

      {/* <TouchableOpacity style={styles.profileItem} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.profileItemText}>Settings</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.profileItem} onPress={handleLogout}>
        <Text style={styles.profileItemText}>Logout</Text>
      </TouchableOpacity> */}
    </View>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#420475',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#420475',
  },
  profileItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  profileItemText: {
    fontSize: 18,
    color: '#333',
  },
  accountInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  accountInfoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
});

export default Profile;
