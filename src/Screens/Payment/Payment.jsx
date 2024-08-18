import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCcMastercard, faPaypal } from '@fortawesome/free-brands-svg-icons';

import Header from '../../Components/Navigation/Header';

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    selectedService,
    selectedDate,
    selectedTime,
    customerName,
    customerPhone,
    customerEmail,
    SelectedServiceRate
  } = route.params;

  const handlePaymentSuccess = () => {
    Alert.alert('Payment Success', 'Appointment booked successfully!');
    navigation.navigate('BookAppointment', { appointmentBooked: true });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header icon={require('../../../assets/back.png')} title={'Payment'} />
      <View style={styles.paymentOptionsContainer}>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={handlePaymentSuccess}>
          <View style={styles.optionContent}>
            <FontAwesomeIcon icon={faCcMastercard} style={styles.icon} />
            <Text style={styles.paymentOptionText}>Pay with Card</Text>
          </View>
          <Text style={styles.paymentAmount}>{SelectedServiceRate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => Alert.alert('PayPal', 'PayPal payment method')}>
          <View style={styles.optionContent}>
            <FontAwesomeIcon icon={faPaypal} style={styles.icon} />
            <Text style={styles.paymentOptionText}>Pay with PayPal</Text>
          </View>
          <Text style={styles.paymentAmount}> {SelectedServiceRate}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.payNowButton} onPress={handlePaymentSuccess}>
        <Text style={styles.payNowButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  paymentOptionsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  paymentAmount: {
    fontSize: 14,
  },
  icon: {
    fontSize: 20,
  },
  payNowButton: {
    backgroundColor: '#420475',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Payment;
