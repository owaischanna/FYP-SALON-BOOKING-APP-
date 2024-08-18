// CustomDropdown.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CustomDropdown = ({ items, defaultValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={[styles.selectedItem, isOpen && styles.selectedItemOpen]}
        onPress={() => setIsOpen(!isOpen)}>
        <Text
          style={[
            styles.selectedItemText,
            selectedItem === defaultValue && { color: '#420475' },
          ]}>
          {selectedItem}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.dropdownList}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => handleSelect(item)}>
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  selectedItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#420475',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedItemOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectedItemText: {
    color: '#000000',
  },
  dropdownList: {
    maxHeight: 150,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#420475',
    marginTop: 5,
    zIndex: 9999,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    color: '#000000',
  },
});

export default CustomDropdown;
