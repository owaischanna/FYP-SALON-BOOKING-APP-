import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList, Alert, StyleSheet} from 'react-native';
import Header from '../../Components/Navigation/Header';
import { faCut, faPaintBrush, faHandScissors, faSpa, faHome, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import {fetchShops, fetchCategories} from '../APIS/APIData';
import CategoryItem from './CategoryItem'; // Ensure this file exists
import SalonProfile from './SalonProfile'; // Ensure this file exists
import BottomNavigation from './BottomNavigation'; // Ensure this file exists
import BannerSlider from './BannerSlider'; // Ensure this file exists

const HomeScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [salons, setSalons] = useState([]);
  const [categories, setCategories] = useState([]);

  const salonImages = [
    require('../../../assets/banner1.jpeg'),
    require('../../../assets/banner2.jpeg'),
    require('../../../assets/banner3.jpeg'),
    // Add more images as needed
  ];

  const iconMapping = {
    'Hair Cutting': faCut,
    'Makeup': faPaintBrush,
    'Nail': faHandScissors,
    'Skincare': faSpa,
    // Add more mappings as needed
  };

  useEffect(() => {
    fetchData();
    fetchCategoriesData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchShops();
      setSalons(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch shops. Please try again later.');
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const categoriesData = await fetchCategories();
      // console.log('Fetched Categories Data:', categoriesData); // Log the data to check its structure
      setCategories(categoriesData.map(category => ({
        name: category.Name,
        icon: iconMapping[category.Name] || faCut,
      })));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch categories. Please try again later.');
    }
  };

  const selectCategory = category => setSelectedCategory(category);

  const filteredSalons = salons.filter(salon => {
    if (selectedCategory && salon.Categories) {
      return Array.isArray(salon.Categories)
        ? salon.Categories.includes(selectedCategory)
        : salon.Categories === selectedCategory;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          title="Home"
          icon={require('../../../assets/icon.png')}
        />
        <BannerSlider />
        <Text style={styles.heading}>Select a Category</Text>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryItem
                category={item}
                onSelect={selectCategory}
                isSelected={selectedCategory === item.name}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
        <Text style={styles.heading}>Top Rated Salons</Text>
        <View style={styles.salonProfileList}>
          {filteredSalons.map((salon, index) => (
            <SalonProfile
              key={salon.ShopId}
              salon={salon}
              image={salonImages[index % salonImages.length]} // Select image based on index
              onPress={() => navigation.navigate('SalonsScreen', {salon})}
              onBook={() => navigation.navigate('BookAppointment', {salon})}
            />
          ))}
        </View>
      </ScrollView>
      <BottomNavigation
        navigateToHome={() => navigation.navigate('HomeScreen')}
        navigateToBookings={() => navigation.navigate('Appointments')}
        navigateToProfile={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  salonProfileList: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
