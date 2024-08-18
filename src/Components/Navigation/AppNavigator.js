import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../Screens/Login&Register/Login';
import Register from '../../Screens/Login&Register/Register';
import ForgotPaswordScreen from '../../Screens/ForgotPaswordScreen/ForgotPaswordScreen';
import NewPaswordScreen from '../../Screens/NewPaswordScreen/NewPaswordScreen';
import ConfirmEmailScreen from '../../Screens/ConfirmEmailScreen/ConfirmEmailScreen';
import SplashScreen from '../../Screens/SplashScreen/SplashScreen';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import BookAppointment from '../../Screens/BookAppointment/BookAppointment';
import Success from '../../Screens/Success/Success';
import Appointments from '../../Screens/Appintments/Appointments';
import Profile from '../../Screens/Profile/Profile';
import Settings from '../../Screens/Settings/Settings';
import NearByMap from '../../Screens/NearBy/NearByMap';
import APIData from '../../Screens/APIS/APIData';
import ChangePasswordScreen from '../../Screens/ChangePaswordScreen/ChangePaswordScreen';
import EditAccountDetailsScreen from '../../Screens/EditAccountDetailsScreen/EditAccountDetailsScreen';
import Notifications from '../../Screens/Notifications/Notifications';
import Guest from '../../Screens/Login&Register/Guest';
import Payment from '../../Screens/Payment/Payment';
import ConfirmationScreen from '../../Screens/BookAppointment/ConfirmationScreen';
import CustomDropdown from '../../Screens/BookAppointment/CustomDropDown';
import SalonsScreen from '../../Screens/HomeScreen/SalonsScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> 
        {/* <Stack.Screen name="ForgotPaswordScreen" component={ForgotPaswordScreen}/>
        <Stack.Screen name="NewPaswordScreen" component={NewPaswordScreen}/> */}
        {/* <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen}/> */}
        <Stack.Screen  name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="BookAppointment" component={BookAppointment} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Appointments" component={Appointments}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name='Notifications' component={Notifications}/>
        {/* <Stack.Screen name='APIData' component={APIData}/> */}
        <Stack.Screen name='ChangePaswordScreen' component={ChangePasswordScreen}/>
        <Stack.Screen name='EditAccountDetailsScreen' component={EditAccountDetailsScreen}/>
        <Stack.Screen name='Guest' component={Guest}/>
        <Stack.Screen name='Payment' component={Payment}/>
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen}/>
        <Stack.Screen name='CustomDropDown' component={CustomDropdown}/>
        <Stack.Screen name='SalonsScreen' component={SalonsScreen}/>
        {/* <Stack.Screen name='NearByMap' component={NearByMap}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
