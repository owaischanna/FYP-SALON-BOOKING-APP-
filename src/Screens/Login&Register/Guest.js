import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Guest = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // Check if phone number is not empty
        if (phoneNumber.trim() !== '') {
            // Simulated login logic for demonstration
            // You can replace this with your actual login logic
            console.log('Login with phone number:', phoneNumber);
            // Redirect user to appropriate screen after login
            navigation.navigate('HomeScreen');
        } else {
            // Set error message to be displayed
            setErrorMessage('Please enter phone number');
        }
    };

    const handleGuestMode = () => {
        // Simulated guest mode registration logic for demonstration
        console.log('Registering as guest with phone number:', phoneNumber);
        // Redirect user to appropriate screen after registration
        navigation.navigate('Guest');
    };

    // Function to validate and format phone number
    const handlePhoneNumberChange = (number) => {
        // Remove any non-numeric characters from input
        const formattedNumber = number.replace(/\D/g, '');

        // Validate number length and format
        if (formattedNumber.length <= 11) {
            // Apply Pakistani phone number format if applicable
            let formattedPhoneNumber = formattedNumber;
            if (formattedNumber.length === 11 && formattedNumber.startsWith('0')) {
                formattedPhoneNumber = `+92${formattedNumber.substring(1)}`;
            }

            // Update state with formatted number
            setPhoneNumber(formattedPhoneNumber);
            // Clear error message if present
            setErrorMessage('');
        } else {
            // Display error message for invalid phone number
            setErrorMessage('Invalid phone number');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text_header}>Welcome!</Text>
            <View style={styles.action}>
                <FontAwesomeIcon icon={faPhone} style={styles.smallIcon} />
                <TextInput
                    placeholder="Enter Phone Number (e.g., 03XX-XXXXXXX)"
                    style={styles.textInput}
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    maxLength={13} // Limit max length to 13 characters (for +92 format)
                />
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                <FontAwesomeIcon icon={faUser} style={styles.smallIcon} />
                <Text style={styles.buttonText}>Login with Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleGuestMode}>
                <FontAwesomeIcon icon={faUserPlus} style={styles.smallIcon} />
                <Text style={styles.buttonText}>Register as Guest</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Guest;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_header: {
        color: '#420475',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#420475',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginBottom: 30,
        width:"95%"
    },
    smallIcon: {
        marginRight: 10,
        fontSize: 24,
        color: '#420475',
    },
    textInput: {
        flex: 1,
        height: 50,
        color: '#05375a',
        marginTop:-2
       
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#420475',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
