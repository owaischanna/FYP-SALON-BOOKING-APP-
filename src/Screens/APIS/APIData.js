import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://167.99.68.31:3000';


const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('authToken');
  // console.log('Token retrieved from AsyncStorage:', token);
  return { Authorization: `Bearer ${token}` };
};
// Login API
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      Email: email,
      Password: password,
    });

    // Log the response data
    console.log('API response data:', response.data);

    const { token, ...userData } = response.data;
    // console.log('Extracted user data:', userData);

    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }

    if (Object.keys(userData).length > 0) {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      const savedUserInfo = await AsyncStorage.getItem('userInfo');
      console.log('User info saved in AsyncStorage:', savedUserInfo);
    } else {
      // console.error('No user data received to save in AsyncStorage');
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'An error occurred during login.';
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    return { success: false, message: errorMessage };
  }
};
// Signup API
export const signup = async (userData) => {
  try {
      console.log('Sending signup request with userData:', userData);

      const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
      console.log('Received signup response:', response.data);

      const { token } = response.data;
      if (token) {
          console.log('Saving token to AsyncStorage');
          await AsyncStorage.setItem('authToken', token);
      }

      // Clear old user data and save new user data
      await AsyncStorage.removeItem('userInfo'); // Ensure this line is executed
      const { Password, ...userDataWithoutPassword } = userData;
      console.log('Saving user data without password to AsyncStorage:', userDataWithoutPassword);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userDataWithoutPassword));

      // Debug log to verify data is saved
      const savedUserInfo = await AsyncStorage.getItem('userInfo');
      console.log('Debug - Saved user info after signup:', savedUserInfo);

      return { success: true, data: userDataWithoutPassword };
  } catch (error) {
      console.error('Signup error:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      let errorMessage = 'An error occurred during signup.';
      if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
          if (error.response.status === 409) {
              errorMessage = 'Email already exists. Please use a different email.';
          }
      }
      return { success: false, message: errorMessage };
  }
};




// Fetch appointments API
export const getAppointments = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(`${BASE_URL}/appointement`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Book appointment API
export const bookAppointment = async (appointmentData) => {
  try {
    const headers = await getAuthHeader();
    console.log('Authorization Header:', headers);
    const response = await axios.post(
      `${BASE_URL}/appointement`,
      appointmentData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error in bookAppointment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

//fetchshops
export const fetchShops = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shop`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add this to your API utility file
export const getEmployees = async () => {
  const authHeader = await getAuthHeader();
  const response = await axios.get(`${BASE_URL}/employee`, { headers: authHeader });
  return response.data;
};
