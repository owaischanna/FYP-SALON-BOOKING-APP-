import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../Login&Register/Style'; // Import styles from the same file where you defined styles for Login component
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons'; // Import the lock icon
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const navigation=useNavigation();
    const [username, setUsername] = useState('');

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handleSendPress = () => {
          navigation.navigate("NewPaswordScreen");
    };

    const handleBackToSignInPress = () => {
        navigation.navigate("Login");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContainer}>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>Reset your password</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faLock} color="#420475" style={styles.smallIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        placeholderTextColor="gray"
                        onChangeText={handleUsernameChange}
                        value={username}
                    />
                </View>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleSendPress}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleBackToSignInPress}>
                    <Text style={styles.buttonText}>Back to Sign in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordScreen;
