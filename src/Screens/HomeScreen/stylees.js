import {StyleSheet,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');


const bannerStyles = StyleSheet.create({
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
});

const categoryStyles = StyleSheet.create({
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  catName: {
    color: '#fff',
    fontWeight: '600',
  },
});

const salonProfileStyles = StyleSheet.create({
  salonProfileContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 15,
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '90%',
    height: 140,
  },
  salonProfileImage: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  salonProfileInfo: {
    paddingLeft: 10,
    paddingTop: 8,
  },
  salonName: {
    color: '#420475',
    fontSize: 16,
    fontWeight: '700',
  },
  salonAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
});

const bottomNavigationStyles = StyleSheet.create({
  bottomNavigation: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  bottomNavItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavItemText: {
    color: '#420475',
    fontSize: 12,
    marginTop: 4,
  },
});

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
});

export {
  bannerStyles,
  categoryStyles,
  salonProfileStyles,
  bottomNavigationStyles,
  globalStyles,
};
