import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../Components/Navigation/Header';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  
  const isCurrentPasswordValid = currentPassword.length > 0;
  const isNewPasswordValid = newPassword.length >= 8 && /\d/.test(newPassword) && /[a-zA-Z]/.test(newPassword);
  const isConfirmNewPasswordValid = newPassword === confirmNewPassword;

  const handleChangePassword = () => {
    if (!isCurrentPasswordValid || !isNewPasswordValid || !isConfirmNewPasswordValid) {
      Alert.alert('Error', 'Please fill in all fields correctly.');
      return;
    }

    // Logic to change password (e.g., API call)
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);

    Alert.alert('Success', 'Password changed successfully.');
  };

  return (
    <>
      <Header
        icon={require('../../../assets/back.png')}
        title="Change Password Screen"
      />
      <View style={styles.container}>
        {/* <Text style={styles.heading}>Change Your Password</Text> */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              <Icon name={showCurrentPassword ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
            </TouchableOpacity>
            {isCurrentPasswordValid ? (
              <Icon name="check" size={20} color="green" style={styles.validationIcon} />
            ) : (
              <Icon name="close" size={20} color="red" style={styles.validationIcon} />
            )}
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon name={showNewPassword ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
            </TouchableOpacity>
            {isNewPasswordValid ? (
              <Icon name="check" size={20} color="green" style={styles.validationIcon} />
            ) : (
              <Icon name="close" size={20} color="red" style={styles.validationIcon} />
            )}
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry={!showConfirmNewPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
              <Icon name={showConfirmNewPassword ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
            </TouchableOpacity>
            {isConfirmNewPasswordValid ? (
              <Icon name="check" size={20} color="green" style={styles.validationIcon} />
            ) : (
              <Icon name="close" size={20} color="red" style={styles.validationIcon} />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  validationIcon: {
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#420475',
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
