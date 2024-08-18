import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import CommonBtn from '../../Components/Navigation/CommonBtn'; // Adjust the import path as necessary

const SalonsScreen = ({ route, navigation }) => {
  const { salon } = route.params;
  const services = salon.services || []; // Ensure services is an array

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: salon.publicURL }} style={styles.image} />
      <Text style={styles.title}>{salon.Name}</Text>
      <Text style={styles.address}>{salon.Address}</Text>
      <Text style={styles.description}>{salon.Description}</Text>
      <Text style={styles.owner}>Owner: {salon.Owner}</Text>
      <View style={styles.services}>
        <Text style={styles.serviceTitle}>Services:</Text>
        {services.length > 0 ? (
          services.map((service, index) => (
            <Text key={index} style={styles.service}>
              {service.name} - Rs{service.price}
            </Text>
          ))
        ) : (
          <Text>No services available</Text>
        )}
      </View>
      <CommonBtn
        w={150}
        h={40}
        status={true}
        text={'Book Appointment'}
        onClick={() => {
          navigation.navigate('BookAppointment', {
            salon: salon // Pass salon details
          });
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  address: {
    fontSize: 16,
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    marginVertical: 8,
  },
  owner: {
    fontSize: 16,
    marginVertical: 4,
  },
  services: {
    marginVertical: 16,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  service: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default SalonsScreen;
