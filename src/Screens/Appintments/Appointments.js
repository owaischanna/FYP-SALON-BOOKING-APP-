import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Header from '../../Components/Navigation/Header';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://167.99.68.31:3000/appointement'); // Update with your actual endpoint
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        Alert.alert('Error', 'Failed to fetch appointments. Please try again later.');
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (AppointmentId) => {
    try {
      await axios.delete(`http://167.99.68.31:3000/appointement/${AppointmentId}`);
      setAppointments(appointments.filter(appointment => appointment.AppointmentId !== AppointmentId));
      Alert.alert('Success', 'Appointment deleted successfully.');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      Alert.alert('Error', 'Failed to delete the appointment. Please try again later.');
    }
  };

  const handleCancel = (AppointmentId) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => handleDelete(AppointmentId) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Appointments'} icon={require('../../../assets/back.png')} showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* List of Appointments */}
        <View style={styles.appointmentList}>
          {appointments.map((appointment, index) => (
            <View key={appointment.AppointmentId} style={styles.appointmentItem}>
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentNumber}>#{index + 1}</Text>
                <Text style={styles.shopName}>Shop: {appointment.shopname || ''}</Text>
                <Text style={styles.serviceName}>Service: {appointment.service?.name || ''}</Text>
                <Text style={styles.appointmentTime}>Time: {appointment.Time || ''}</Text>
                <Text style={styles.appointmentDate}>Date: {appointment.date || ''}</Text>
                <Text style={styles.appointmentPrice}>Price: ${appointment.Price || ''}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(appointment.AppointmentId)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancel(appointment.AppointmentId)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  appointmentList: {
    paddingHorizontal: 15,
  },
  appointmentItem: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appointmentDetails: {
    padding: 10,
  },
  salonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#420475',
    marginBottom: 5,
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#420475',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#666',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
  },
  appointmentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#420475', // Keep the background color as #420475
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f0ad4e',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Appointments;
