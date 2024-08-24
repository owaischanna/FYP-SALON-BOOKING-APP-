import React, { useEffect, useState } from 'react';
import { Alert, ScrollView,Image, Dimensions,Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomDropdown from './CustomDropDown';
import Header from '../../Components/Navigation/Header';
import{Calendar}from'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppointments,bookAppointment,getEmployees,getServices } from '../APIS/APIData'; // Replace with your API functions

 // Replace with your API functions
 const screenWidth = Dimensions.get('window').width;


const BookAppointment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { salon } = route.params || {};
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [SelectedServiceRate, setSelectedServiceRate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [selectedShop, setSelectedShop] = useState(salon || {});
  const [employees, setEmployees] = useState([]);
  const [persistedBookedSlots, setPersistedBookedSlots] = useState({});
  const [services, setServices] = useState([]);

  

  useEffect(() => {
    fetchAppointments();
    fetchEmployees();
    fetchServicesData();
    retrievePersistedBookedSlots();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedEmployee) {
      filterBookedSlots(selectedDate, selectedEmployee);
    }
  }, [selectedDate, selectedEmployee, appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response);

      const userAppointments = response.filter(
        appointment => appointment.UserId === 'currentUserId' // Replace with actual user ID
      );
      setUserAppointments(userAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchServicesData = async () => {
    try {
      const serviceData = await getServices();
      // console.log('Fetched Services:', serviceData); // Should log the array of services or an empty array

      if (serviceData && Array.isArray(serviceData)) {
        setServices(serviceData); // Set state only if the data is an array
      } else {
        console.error('No valid services data found');
      }
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  };
  


  
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const retrievePersistedBookedSlots = async () => {
    try {
      const persistedData = await AsyncStorage.getItem('bookedSlots');
      if (persistedData) {
        setPersistedBookedSlots(JSON.parse(persistedData));
      }
    } catch (error) {
      console.error('Error retrieving persisted booked slots:', error);
    }
  };

  const filterBookedSlots = (date, employee) => {
    const employeeId = employees.find(emp => emp.Name === employee)?.EmployeeId;
    const booked = appointments.filter(
      appointment =>
        appointment.date === date && appointment.EmployeeId === employeeId
    ).map(appointment => appointment.Time);

    const persistedSlots = persistedBookedSlots[date] || [];
    setBookedSlots([...booked, ...persistedSlots]);
  };

  const isAfter630PM = () => {
    const now = new Date();
    const cutoffHour = 18; // 6:00 PM
    const cutoffMinute = 30; // 6:30 PM

    if (now.getHours() > cutoffHour || (now.getHours() === cutoffHour && now.getMinutes() >= cutoffMinute)) {
      return true;
    }
    return false;
  };

  const handleBookAppointment = async () => {
    if (selectedDate && selectedTime && selectedEmployee) {
      const selectedEmployeeId = employees.find(emp => emp.Name === selectedEmployee)?.EmployeeId;
      const selectedServiceId = services.find(ser=>ser.Name==selectedService)?.selectedServiceId;
      const shopId = selectedShop.ShopId;

      if (!shopId) {
        Alert.alert('Error', 'Selected shop does not exist.');
        return;
      }

      // Check for booking limit by service category
      const serviceCategoryCount = userAppointments.filter(app => app.ServiceId === selectedServiceId).length;
      const totalAppointments = userAppointments.length;

      if (serviceCategoryCount >= 2) {
        Alert.alert('Booking Limit Reached', 'You cannot book more than two appointments of the same category.');
        return;
      }

      if (totalAppointments >= 2) {
        Alert.alert('Overall Booking Limit Reached', 'You cannot book more than two appointments in total.');
        return;
      }

      if (bookedSlots.includes(selectedTime)) {
        Alert.alert('Slot Unavailable', 'This time slot is already booked. Please select another slot.');
        return;
      }

      const dateObj = new Date(selectedDate);
      const formattedDate = `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;

      const appointmentData = {
        EmployeeId: selectedEmployeeId,
        ShopId: shopId,
        ServiceId: selectedServiceId,
        date: formattedDate,
        Time: selectedTime,
        Price: SelectedServiceRate.replace('PKR', ''),
        UserId: 'currentUserId', // Replace with actual user ID
      };

      try {
        const result = await bookAppointment(appointmentData);
        if (result) {
          setAppointments([...appointments, appointmentData]);
          setUserAppointments([...userAppointments, appointmentData]);

          // Update booked slots
          const updatedPersistedSlots = {
            ...persistedBookedSlots,
            [selectedDate]: [...(persistedBookedSlots[selectedDate] || []), selectedTime]
          };
          await AsyncStorage.setItem('bookedSlots', JSON.stringify(updatedPersistedSlots));
          setPersistedBookedSlots(updatedPersistedSlots);

          navigation.navigate('ConfirmationScreen', {
            salon: selectedShop,
            selectedService,
            selectedDate,
            selectedTime,
            SelectedServiceRate,
            selectedEmployee,
          });
        } else {
          Alert.alert('Error', 'Failed to book the appointment. Please try again.');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        const errorMessage = error.response?.data?.message || 'Failed to book the appointment. Please check your network connection and try again.';
        Alert.alert('Error', errorMessage);
      }
    } else {
      Alert.alert('Selection Error', 'Please select a date, time, and employee to book the appointment.');
    }
  };

  const handleDayPress = (day) => {
    const selectedDay = new Date(day.dateString);
    if (isAfter630PM() && selectedDay.toDateString() === new Date().toDateString()) {
      setSelectedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      Alert.alert('Time Passed', 'You cannot book an appointment for today as it is past 6:30 PM. Showing available slots for tomorrow.');
    } else {
      setSelectedDate(day.dateString);
    }
  };

  const handleTimeSlotSelection = timeSlot => {
    setSelectedTime(timeSlot);
    setSelectedSlot(timeSlot);
  };

  const renderTimeSlots = () => {
    const slots = {
        Morning: [],
        Afternoon: [],
        Evening: [],
    };

    const currentDay = new Date().toISOString().split('T')[0];
    const isToday = selectedDate === currentDay;
    const now = new Date();

    for (let hour = 10; hour < 20; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

            // Exclude the break from 14:00 to 15:00
            if (time !== '14:00' && time !== '14:30') {
                const timeSlotDateTime = new Date(`${selectedDate}T${time}`);

                // Check if the time slot is valid (not in the past for today and not booked)
                if (
                    (!isToday || timeSlotDateTime > now) &&
                    !bookedSlots.includes(time)
                ) {
                    if (hour < 12) {
                        slots.Morning.push(time);
                    } else if (hour >= 12 && hour < 17) {
                        slots.Afternoon.push(time);
                    } else {
                        slots.Evening.push(time);
                    }
                }
            }
        }
    }

    return slots;
};

  

  const formatTime = time => {
    const [hour, minute] = time.split(':');
    const hours = parseInt(hour);
    const suffix = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    const formattedHour = hours % 12 || 12;
    return `${formattedHour}:${minute} ${suffix}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        icon={require('../../../assets/back.png')}
        title={'Book Appointment'}
      />
      {salon ? (
        <>
          <Image
            source={require('../../../assets/banner3.jpeg')} // Ensure default image URL
            style={styles.SalonImg}
          />
          <Text style={styles.name}>{salon.Name}</Text>
          <Text style={styles.rating}>Rating {selectedShop.rating || 'N/A'}</Text>
        </>
      ) : (
        <Text style={styles.heading}>No salon selected</Text>
      )}

      <Text style={styles.heading}>Select Employee</Text>
      <CustomDropdown
        items={employees.map(employee => employee.Name)}
        defaultValue="Choose an Employee"
        onSelect={item => setSelectedEmployee(item)}
      />
      <Text style={styles.heading}>Select Date</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#420475' }
        }}
        theme={{
          selectedDayBackgroundColor: '#420475',
          todayTextColor: '#420475',
          dayTextColor: '#000',
          monthTextColor: '#000',
          textSectionTitleColor: '#000'
        }}
        minDate={new Date().toISOString().split('T')[0]} // Disable past dates
        style={styles.calendar} // Apply custom styling
      />
      <View>
      </View>
      <View>
        <Text style={styles.heading}>Available Slots</Text>
        {Object.keys(renderTimeSlots()).map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryHeading}>{category}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {renderTimeSlots()[category].map((timeSlot, slotIndex) => (
                <TouchableOpacity
                  key={slotIndex}
                  style={[
                    styles.timeSlot,
                    {
                      borderColor:
                        selectedSlot === timeSlot ? '#420475' : 'black',
                    },
                  ]}
                  onPress={() => handleTimeSlotSelection(timeSlot)}>
                  <Text
                    style={{
                      color: selectedSlot === timeSlot ? '#420475' : 'black',
                    }}>
                    {formatTime(timeSlot)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}

        <View style={styles.container}>
          <View style={styles.section}>
          <Text style={styles.heading}>Select Service</Text>
          <CustomDropdown
  items={services.map(service => `${service.ServiceName} - PKR${service.ServicePrice}`)}
  defaultValue="Choose an Option"
  onSelect={(value) => {
    const [serviceName, rate] = value.split(" - PKR");
    setSelectedService(serviceName);
    setSelectedServiceRate(rate);
  }}
/>

          </View>

          <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
    
  },
  SalonImg: {
    width: '100%',
    height: 200,
    marginTop: 10,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    color: '#420475',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
  timeSlot: {
    width: 160, // Adjust slot width
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    marginVertical: 5, // Add vertical margin for spacing between slots
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  input: {
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#420475',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    width: screenWidth * 0.9, // Set width to 90% of the screen width
    marginHorizontal: screenWidth * 0.05, // Set horizontal margin to 5% of the screen width
  },
  serviceItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    
   
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '700',
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', 
    paddingHorizontal: 10, 
    
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  categoryHeading: {
    color: '#420475',
    fontSize: 16, 
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 15,
  },
});

export default BookAppointment;

