import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../Login&Register/Style'; // Import styles from the same file where you defined styles for ForgotPasswordScreen
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const navigation = useNavigation();

    const onConfirmPressed = () => {
        // Handle confirmation logic here
        navigation.navigate('HomeScreen');
    };

    const onResendPressed = () => {
        // Handle resend code logic here
        console.warn('Resend code pressed');
    };

    const onSignInPressed = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContainer}>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>Confirm Your Email</Text>
                <View style={styles.action}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter Confirmation Code"
                        placeholderTextColor="gray"
                        value={confirmationCode}
                        onChangeText={setConfirmationCode}
                    />
                </View>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.buttonContainer} onPress={onConfirmPressed}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.buttonContainer} onPress={onResendPressed}>
                    <Text style={styles.buttonText}>Resend Code</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.buttonContainer} onPress={onSignInPressed}>
                    <Text style={styles.buttonText}>Back to Sign In</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ConfirmEmailScreen;
