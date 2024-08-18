import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from './Style';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { signup } from '../APIS/APIData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
    const [name, setName] = useState('');
    const [nameVerify, setNameVerify] = useState(false);
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('');
    const [userTypeVerify, setUserTypeVerify] = useState(false);

    // Validate name
    function handleName(e) {
        const nameVar = e.nativeEvent.text;
        setName(nameVar);
        const isValid = /^[a-zA-Z\s]{4,}$/.test(nameVar); // At least 4 characters and no numbers
        setNameVerify(isValid);
    }

    // Validate email
    function handleEmail(e) {
        const emailVar = e.nativeEvent.text;
        setEmail(emailVar);
        const isValid = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar);
        setEmailVerify(isValid);
    }

    // Validate password
    function handlePassword(e) {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(passwordVar); // At least 6 characters, including upper, lower, and a number
        setPasswordVerify(isValid);
    }

    // Validate user type
    function handleUserType(e) {
        const userTypeVar = e.nativeEvent.text;
        setUserType(userTypeVar);
        setUserTypeVerify(userTypeVar.length > 0); // Must not be empty
    }

    const navigation = useNavigation();
    const handleBackToLogin = () => {
        navigation.navigate('Login');
    };

    const handleRegisterPressed = async () => {
        if (!nameVerify || !emailVerify || !passwordVerify || !userTypeVerify) {
            Alert.alert('Invalid Input', 'Please check your inputs.');
            return;
        }
    
        const userData = { FullName: name, Email: email, Password: password, UserType: userType };
        console.log('Prepared userData for signup:', userData); // Log the user data before sending
    
        try {
            const result = await signup(userData);
    
            if (result.success) {
                Alert.alert('Success', 'Registration successful!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', `Registration failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    };
    

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../../assets/logo1.png')} />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}> Register!!</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faUser} color="#420475" style={styles.smallIcon} />
                    <TextInput 
                        placeholder='Name'
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        onChange={e => handleName(e)} />
                    {name.length < 1 ? null : nameVerify ? (
                        <FontAwesomeIcon icon={faCheckCircle} color="green" size={20} />
                    ) : (
                        <FontAwesomeIcon icon={faTimesCircle} color="red" size={20} />
                    )}
                </View>
                {name.length < 1 ? null : nameVerify ? null : (
                    <Text style={{ marginLeft: 20, color: 'red' }}>
                        Name should be at least 4 characters and contain no numbers
                    </Text>
                )}

                <View style={styles.action}>
                    <FontAwesomeIcon icon={faMessage} color="#420475" style={styles.smallIcon} />
                    <TextInput 
                        placeholder='Email'
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        onChange={e => handleEmail(e)} />
                    {email.length < 1 ? null : emailVerify ? (
                        <FontAwesomeIcon icon={faCheckCircle} color="green" size={20} />
                    ) : (
                        <FontAwesomeIcon icon={faTimesCircle} color="red" size={20} />
                    )}
                </View>
                {email.length < 1 ? null : emailVerify ? null : (
                    <Text style={{ marginLeft: 20, color: 'red' }}>
                        Enter a valid email address 
                    </Text>
                )}

                <View style={styles.action}>
                    <FontAwesomeIcon icon={faLock} color="#420475" style={styles.smallIcon} />
                    <TextInput 
                        placeholder='Password'
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        onChange={e => handlePassword(e)} 
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                        {password.length < 1 ? null : showPassword ? 
                            <Feather name="eye-off" style={{ marginRight: -10 }} color={passwordVerify ? 'green' : 'red'} size={23} /> : 
                            <Feather name="eye" style={{ marginRight: -10 }} color={passwordVerify ? 'green' : 'red'} size={23} />}
                    </TouchableOpacity>
                </View>
                {password.length < 1 ? null : passwordVerify ? null : (
                    <Text style={{ marginLeft: 20, color: 'red' }}>
                        Password must be at least 6 characters, including an uppercase letter, a lowercase letter, and a number.
                    </Text>
                )}

                <View style={styles.action}>
                    <FontAwesomeIcon icon={faUser} color="#420475" style={styles.smallIcon} />
                    <TextInput 
                        placeholder='User Type'
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        onChange={e => handleUserType(e)} />
                    {userType.length < 1 ? null : userTypeVerify ? (
                        <FontAwesomeIcon icon={faCheckCircle} color="green" size={20} />
                    ) : (
                        <FontAwesomeIcon icon={faTimesCircle} color="red" size={20} />
                    )}
                </View>
                {userType.length < 1 ? null : userTypeVerify ? null : (
                    <Text style={{ marginLeft: 20, color: 'red' }}>
                        User Type should not be empty
                    </Text>
                )}

                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginRight: 10 }}>
                </View>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={handleRegisterPressed} style={styles.inBut}>
                    <View>
                        <Text style={styles.textSign}> Register </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backToLoginButton} onPress={handleBackToLogin}>
                    <FontAwesomeIcon icon={faArrowLeft} color="#420475" style={styles.backToLoginIcon} />
                    <Text style={styles.backToLoginText}> Back to Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Register;
