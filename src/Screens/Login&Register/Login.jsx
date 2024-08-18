import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from './Style';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../APIS/APIData';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    function handlePassword(e) {
        const passwordVar = e.nativeEvent.text;
        setPassword(passwordVar);
        setPasswordVerify(false);
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(passwordVar)) {
            setPassword(passwordVar);
            setPasswordVerify(true);
        }
    }

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPasswordScreen'); 
    };

    const handleLogin = async () => {
        try {
          const result = await login(email, password);
      
          if (result.success) {
            // Retrieve user data from AsyncStorage
            const storedUserInfo = await AsyncStorage.getItem('userInfo');
            const userData = storedUserInfo ? JSON.parse(storedUserInfo) : {};
      
            navigation.navigate('HomeScreen', { userData });
          } else {
            Alert.alert('Login Failed', result.message);
          }
        } catch (error) {
          console.error('Error logging in:', error);
          Alert.alert('Error', 'Failed to login. Please try again.');
        }
      };
          const handleGuest = () => {
        navigation.navigate("Guest");
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../../assets/logo1.png')} />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>Login!!</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faUser} color="#420475" style={styles.smallIcon} />
                    <TextInput
                        placeholder='Mobile or Email'
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesomeIcon icon={faLock} color="#420475" style={styles.smallIcon} />
                    <TextInput
                        placeholder='Password'
                        style={styles.textInput}
                        placeholderTextColor="gray"
                        onChange={e => handlePassword(e)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {password.length < 1 ? null : showPassword ? (
                            <Feather name="eye-off" style={{ marginRight: -10 }} color={passwordVerify ? 'green' : 'red'} size={23} />
                        ) : (
                            <Feather name="eye" style={{ marginRight: -10 }} color={passwordVerify ? 'green' : 'red'} size={23} />
                        )}
                    </TouchableOpacity>
                </View>
                {password.length < 1 ? null : passwordVerify ? null : (
                    <Text style={{ marginLeft: 20, color: 'red' }}>
                        Uppercase, Lowercase, Number and 6 or more characters
                    </Text>
                )}
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 8, marginRight: 10 }}>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={{ color: "#420475", fontWeight: '700', marginTop: 8 }}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.inBut} onPress={handleLogin}>
                    <View>
                        <Text style={styles.textSign}>Login</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
                        ---Or Continue as---
                    </Text>
                </View>
                <View style={styles.bottomButton}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.inBut2} onPress={handleGuest}>
                            <FontAwesomeIcon icon={faUser} color='white' style={styles.smallIcon2} />
                        </TouchableOpacity>
                        <Text style={styles.bottomText}>Guest</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.inBut2} onPress={() => { navigation.navigate("Register"); }}>
                            <FontAwesomeIcon icon={faUserPlus} color='white' style={[styles.smallIcon2, { fontSize: 30 }]} />
                        </TouchableOpacity>
                        <Text style={styles.bottomText}>Sign Up</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Login;
