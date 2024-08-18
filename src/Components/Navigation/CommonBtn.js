import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const CommonBtn = ({w, h, text, onClick, status}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick();
      }}
      style={{alignSelf: 'center', marginTop: 10, marginBottom: 10}}>
      {status ? (
        <LinearGradient
          colors={['#420475', '#2A2A72']}
          style={[styles.button, {width: w, height: h}]}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
            {text}
          </Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={['#8e8e8e', '#8e8e8e']}
          style={[styles.button, {width: w, height: h}]}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
              opacity: 0.7,
            }}>
            {text}
          </Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Adjust the value for the desired curve
    borderWidth: 1, // Add border
    borderColor: '#fff',
    // Border color
  },
});

export default CommonBtn;
