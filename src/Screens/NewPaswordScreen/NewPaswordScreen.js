import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../Login&Register/Style'; // Import styles from the same file where you defined styles for ForgotPasswordScreen
import { useNavigation } from '@react-navigation/native';

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('Login');
    };

    const onSubmitPressed = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContainer}>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>New Password</Text>
                <View style={styles.action}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Code"
                        placeholderTextColor="gray"
                        value={code}
                        onChangeText={setCode}
                    />
                </View>
                <View style={styles.action}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your New Password"
                        placeholderTextColor="gray"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                </View>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.buttonContainer} onPress={onSubmitPressed}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.buttonContainer} onPress={onSignInPressed}>
                    <Text style={styles.buttonText}>Back to Sign in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default NewPasswordScreen;
