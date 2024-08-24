import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getAppointments, deleteAppointment } from '../APIS/APIData'; // Adjust the path
import Header from '../../Components/Navigation/Header';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments when the component mounts
    const loadAppointments = async () => {
      try {
        const data = await getAppointments();
        
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.warn('Unexpected data format:', data);
          // Optionally set appointments to an empty array or handle as needed
          setAppointments([]);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch appointments. Please try again later.');
      }
    };
    loadAppointments();
  }, []);

  const handleDelete = async (AppointmentId) => {
    try {
      await deleteAppointment(AppointmentId);
      setAppointments(appointments.filter(appointment => appointment.AppointmentId !== AppointmentId));
      Alert.alert('Success', 'Appointment deleted successfully.');
    } catch (error) {
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
        {/* Conditional Rendering for No Appointments */}
        {appointments.length === 0 ? (
          <View style={styles.noAppointmentsContainer}>
            <Text style={styles.noAppointmentsText}>No Appointments are available.</Text>
          </View>
        ) : (
          <View style={styles.appointmentList}>
            {appointments.map((appointment, index) => (
              <View key={appointment.AppointmentId} style={styles.appointmentItem}>
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentNumber}>Appointment #{index + 1}</Text>
                  <View style={styles.infoContainer}>
                    <Text style={styles.salonName}>Shop: {appointment.shop?.Name || 'N/A'}</Text>
                    {appointment.services && appointment.services.length > 0 ? (
                      <Text style={styles.serviceName}>Service: {appointment.services[0]?.ServiceName || 'N/A'}</Text>
                    ) : (
                      <Text style={styles.serviceName}>Service: N/A</Text>
                    )}
                  </View>
                  <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeBox}>
                      <Text style={styles.dateTimeLabel}>Date:</Text>
                      <Text style={styles.dateTimeValue}>{appointment.date || 'N/A'}</Text>
                    </View>
                    <View style={styles.dateTimeBox}>
                      <Text style={styles.dateTimeLabel}>Time:</Text>
                      <Text style={styles.dateTimeValue}>{appointment.Time || 'N/A'}</Text>
                    </View>
                  </View>
                  <Text style={styles.appointmentPrice}>Price: ${appointment.Price || '0.00'}</Text>
                  <Text style={styles.appointmentEmployee}>Employee: {appointment.employee?.Name || 'N/A'}</Text>
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
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  noAppointmentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noAppointmentsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  appointmentList: {
    marginBottom: 20,
  },
  appointmentItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 15,
  },
  salonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#420475',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 16,
    color: '#666',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateTimeBox: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  dateTimeValue: {
    fontSize: 14,
    color: '#555',
  },
  appointmentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  appointmentEmployee: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
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
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Appointments;
