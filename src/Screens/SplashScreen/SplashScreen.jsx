import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SplashScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Salon & Barber Booking</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require("../../../assets/logo1.png")} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 250,
  },
  title: {
    color: '#051C60',
    fontWeight: 'bold',
    fontFamily: 'Sens-Serif',
    fontSize: 30,
  },
  logo: {
    width: 270,
    height: 250,
  },
  button: {
    backgroundColor: '#420475',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    
  }
});

export default SplashScreen;
