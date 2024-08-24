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

    console.log('API response data:', response.data);

    const { token, ...userData } = response.data;

    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }

    if (Object.keys(userData).length > 0) {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      const savedUserInfo = await AsyncStorage.getItem('userInfo');
      console.log('User info saved in AsyncStorage:', savedUserInfo);
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error('Login error:', error);

    let errorMessage = 'An error occurred during login.';

    if (error.response) {
      // Handle specific status codes or error response formats
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid credentials. Please check your email and password.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please check your credentials.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = 'An unexpected error occurred.';
          break;
      }
    } else if (error.request) {
      errorMessage = 'No response received from the server.';
    } else {
      errorMessage = 'Request setup error: ' + error.message;
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



// Function to delete an appointment
export const deleteAppointment = async (AppointmentId) => {
  try {
    await axios.delete(`${BASE_URL}/appointement/${AppointmentId}`);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// Fetch appointments API
export const getAppointments = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(`${BASE_URL}/appointement/get-my-appointments`, { headers });
    console.log('API Response:', response.data);
    // Extract the data field which contains the array of appointments
    return response.data.data; // Correctly return the data field
  } catch (error) {
    console.error('Error fetching appointments:', error);
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

//fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    
    // Check if response has data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('No data found');
    }
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error; // Re-throw the error after logging
  }
};

// Add this to your API utility file
export const getEmployees = async () => {
  const authHeader = await getAuthHeader();
  const response = await axios.get(`${BASE_URL}/employee`, { headers: authHeader });
  return response.data;
};

//getservices
export const getServices = async () => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.get(`${BASE_URL}/service`, { headers: authHeader });
    
    // console.log('Raw API Response:', response); // Log the entire response
    // console.log('Service Data:', response.data); // Log the data directly

    return response.data; // Return data directly as it is an array
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};


