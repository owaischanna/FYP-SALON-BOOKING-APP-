import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import CommonBtn from '../../Components/Navigation/CommonBtn'; // Adjust the import path as necessary

const SalonsScreen = ({ route, navigation }) => {
  const { salon } = route.params;
  const services = salon.services || []; // Ensure services is an array

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: salon.publicURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{salon.Name}</Text>
        <Text style={styles.address}>{salon.Address}</Text>
        <Text style={styles.description}>{salon.Description}</Text>
      </View>
      {/* <View style={styles.servicesContainer}>
        <Text style={styles.serviceTitle}>Services:</Text>
        {services.length > 0 ? (
          services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>Rs{service.price}</Text>
            </View>
          ))
        ) : (
          // Removed No services available text
          <View style={styles.noServicesPlaceholder} />
        )}
      </View> */}
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
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoContainer: {
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  servicesContainer: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  serviceName: {
    fontSize: 16,
    color: '#444',
  },
  servicePrice: {
    fontSize: 16,
    color: '#007BFF',
  },
  noServicesPlaceholder: {
    height: 40, // Adjust as needed
  },
});

export default SalonsScreen;
