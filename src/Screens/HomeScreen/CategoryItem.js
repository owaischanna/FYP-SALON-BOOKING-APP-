// // Components/CategoryItem.js

// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// const CategoryItem = ({ category, onSelect, isSelected }) => {
//   return (
//     <TouchableOpacity
//       style={[styles.categoryItem, isSelected && styles.selectedCategory]}
//       onPress={() => onSelect(category.name)}
//     >
//       <LinearGradient
//         colors={['#420475', '#2A2A72']}
//         style={styles.linearGradient}
//       >
//         <FontAwesomeIcon
//           icon={category.icon}
//           size={24}
//           color="#fff"
//           style={styles.icon}
//         />
//         <Text style={styles.catName}>{category.name}</Text>
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   categoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     margin: 5,
//     borderRadius: 8,
//     backgroundColor: '#f8f8f8',
//   },
//   selectedCategory: {
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   linearGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     padding: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   catName: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default CategoryItem;
// Components/CategoryItem.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CategoryItem = ({ category, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        isSelected && styles.selectedCategory,
      ]}
      onPress={() => onSelect(category.name)}
    >
      <LinearGradient
        colors={['#420475', '#2A2A72']}
        style={styles.linearGradient}
      >
        <FontAwesomeIcon
          icon={category.icon}
          size={16}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.catName}>{category.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection:'row',
    // padding:10,
    // margin:5,
    borderRadius:8,
    marginRight: 2,
    marginLeft: 5,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  linearGradient: {
    width: 120,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    marginBottom: 5,
  },
  catName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CategoryItem;
