import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../Components/Navigation/Header';

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    selectedService,
    selectedDate,
    selectedTime,
    // customerEmail,
    SelectedServiceRate,
    selectedEmployee
  } = route.params;

  const handleConfirm = () => {
    navigation.navigate('Payment', {
      selectedService,
      selectedDate,
      selectedTime,
      SelectedServiceRate,
      selectedEmployee
    });
  };

  return (
    <View style={styles.container}>
      <Header
        icon={require('../../../assets/back.png')}
        title={'Booking Confirmation'}
      />
      <View style={styles.bookingDetailsContainer}>
      <View style={styles.detailRow}>
          <Text style={styles.label}>Employee Name:</Text>
          <Text style={styles.value}>{selectedEmployee}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Service:</Text>
          <Text style={styles.value}>{selectedService}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{selectedDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{selectedTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{SelectedServiceRate}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
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
  bookingDetailsContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',

  },
  value: {
    fontSize: 16,
    color: '#666',
    fontWeight:'bold'
  },
  confirmButton: {
    backgroundColor: '#420475',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ConfirmationScreen;
