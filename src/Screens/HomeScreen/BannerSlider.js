// import React from 'react';
// import {View, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';

// const {width} = Dimensions.get('window');

// const BannerSlider = () => {
//   const banners = [
//     require('../../../assets/banner1.jpeg'),
//     require('../../../assets/banner2.jpeg'),
//     require('../../../assets/banner3.jpeg'),
//   ];

//   return (
//     <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
//       {banners.map((banner, index) => (
//         <View key={index} style={styles.bannerContainer}>
//           <Image source={banner} style={styles.bannerImage} />
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   bannerContainer: {
//     width: width - 40,
//     margin: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   bannerImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//   },
// });

// export default BannerSlider;
// Components/BannerSlider.js

import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const BannerSlider = () => {
  const banners = [
    require('../../../assets/banner1.jpeg'),
    require('../../../assets/banner2.jpeg'),
    require('../../../assets/banner3.jpeg'),
  ];

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {banners.map((banner, index) => (
        <View key={index} style={styles.bannerContainer}>
          <Image source={banner} style={styles.bannerImage} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: width - 30, // Adjust width to match HomeScreen padding
    marginHorizontal: 10, // Adjust margin to match HomeScreen spacing
    borderRadius: 10, // Ensure consistent border radius
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default BannerSlider;
