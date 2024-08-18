import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DateSelection = ({ selectedDate, handleDateSelection }) => {
  return (
    <View style={styles.dateContainer}>
      {[1, 2, 3, 4, 5].map((date) => (
        <TouchableOpacity
          key={date}
          style={[
            styles.dateButton,
            { backgroundColor: selectedDate === date ? '#420475' : '#ffffff' },
          ]}
          onPress={() => handleDateSelection(date)}>
          <Text style={{ color: selectedDate === date ? '#ffffff' : '#000000' }}>{`Date ${date}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dateButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#420475',
  },
});

export default DateSelection;
