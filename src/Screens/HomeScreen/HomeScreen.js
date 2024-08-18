import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCut,
  faPaintBrush,
  faHandScissors,
  faSpa,
  faHome,
  faCalendarAlt,
  faUser,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import CommonBtn from '../../Components/Navigation/CommonBtn'; // Adjust import path as necessary
import Header from '../../Components/Navigation/Header'; // Adjust import path as necessary
import {fetchShops} from '../APIS/APIData'; // Adjust import path as necessary
import {StyleSheet} from 'react-native'; // Adjust import path as necessary

const categories = [
  {name: 'Hair Cutting', icon: faCut},
  {name: 'Makeup', icon: faPaintBrush},
  {name: 'Nail', icon: faHandScissors},
  {name: 'Skincare', icon: faSpa},
];

const HomeScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchShops();
      // Log the response data
      setSalons(response.data || []); // Access the nested data array if needed
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch shops. Please try again later.');
      // setSalons([]); // Set salons to an empty array in case of an error
    }
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
    setNotificationCount(0);
  };

  const selectCategory = category => {
    setSelectedCategory(category);
    console.log('Selected Category:', category);
  };

  const filteredSalons = salons.filter(salon => {
    if (selectedCategory && salon.Categories) {
      if (Array.isArray(salon.Categories)) {
        return salon.Categories.includes(selectedCategory);
      } else {
        return salon.Categories === selectedCategory;
      }
    } else {
      return true; // Show all salons if no category is selected or Categories is undefined/null
    }
  });

  useEffect(() => {
    // console.log('Filtered Salons:', filteredSalons);
  }, [filteredSalons]);

  const navigateToHome = () => {
    navigation.navigate('HomeScreen');
  };

  // const navigateToNearby = () => {
  //   navigation.navigate('NearByMap');
  // };

  const navigateToBookings = () => {
    navigation.navigate('Appointments');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          title="Home"
          icon={require('../../../assets/icon.png')}
          notificationCount={notificationCount}
          onPressNotification={handleNotificationPress}
        />
        <View style={styles.bannerContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={4} // Change autoplay speed as needed
          >
            <View style={styles.slide}>
              <Image
                source={require('../../../assets/banner.jpg')}
                style={styles.banner}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../../../assets/banner11.jpg')}
                style={styles.banner}
              />
            </View>
          </Swiper>
        </View>
        <Text style={styles.heading}>Select a Category</Text>
        <View style={{marginTop: 10}}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategory === item.name && styles.selectedCategory,
                ]}
                onPress={() => selectCategory(item.name)}>
                <LinearGradient
                  colors={['#420475', '#2A2A72']}
                  style={styles.linearGradient}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    size={16}
                    color="#fff"
                    style={styles.icon}
                  />
                  <Text style={styles.catName}>{item.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Text style={styles.heading}>Top Rated Salons</Text>
        <View style={styles.salonProfileList}>
          {filteredSalons.map((salon, index) => (
            <TouchableOpacity
              key={salon.ShopId}
              style={styles.salonProfileContainer}
              onPress={() => navigation.navigate('SalonsScreen', {salon})}>
              <Image
                source={{uri: salon.publicURL}}
                style={styles.salonProfileImage}
              />
              <View style={styles.salonProfileInfo}>
                <Text style={styles.salonName}>{salon.Name}</Text>
                <Text style={styles.salonAddress}>
                  Address: {salon.Address}
                </Text>
               
                <CommonBtn
                  w={150}
                  h={40}
                  status={true} // Always true to ensure the button is enabled and purple
                  text={'Book Appointment'}
                  onClick={() => {
                    navigation.navigate('BookAppointment', {
                      salon: salon, // Pass salon details
                    });
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={navigateToHome}>
          <FontAwesomeIcon icon={faHome} size={24} color="#420475" />
          <Text style={styles.bottomNavItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={navigateToBookings}>
          <FontAwesomeIcon icon={faCalendarAlt} size={24} color="#420475" />
          <Text style={styles.bottomNavItemText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={navigateToProfile}>
          <FontAwesomeIcon icon={faUser} size={24} color="#420475" />
          <Text style={styles.bottomNavItemText}>Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={navigateToNearby}>
          <FontAwesomeIcon icon={faLocationDot} size={24} color="#420475" />
          <Text style={styles.bottomNavItemText}>NearBy</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: 200,
    marginTop: 8,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '95%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  heading: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
  categoryItem: {
    marginRight: 2,
    marginLeft: 5,
  },
  linearGradient: {
    width: 120,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  salonProfileList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  salonProfileContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '48%',
  },
  salonProfileImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  salonProfileInfo: {
    padding: 10,
  },
  salonName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  salonRating: {
    fontSize: 14,
    color: '#888',
  },
  icon: {
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '600',
    alignSelf: 'center',
  },
  bottomView: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 10, // Adjust as needed
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10, // Adjust as needed
  },
  bottomNavItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#420475',
  },
});
