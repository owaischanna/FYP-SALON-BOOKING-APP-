import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const sampleNotifications = [
  { id: 1, text: 'New appointment booked' },
  { id: 2, text: 'Payment received' },
  { id: 3, text: 'Reminder: Your appointment is tomorrow' },
];

const Notifications = () => {
  const navigation = useNavigation();

  const renderNotification = (notification, index) => {
    return (
      <Animated.View key={notification.id} style={[styles.notification, { opacity: fadeAnim }]}>
        <Text style={styles.notificationText}>{notification.text}</Text>
      </Animated.View>
    );
  };

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Notifications</Text>
      </View>
      {sampleNotifications.map(renderNotification)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0', // Customize notification background color
  },
  notificationText: {
    fontSize: 16,
  },
});

export default Notifications;
