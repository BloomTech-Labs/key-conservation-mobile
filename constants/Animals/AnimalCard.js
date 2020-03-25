import { Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default {
  animalCard: {
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('screen').height * 0.11,
    width: Dimensions.get('screen').width,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  animalCardSelected: {
    flex: 1,
    height: Dimensions.get('screen').height * 0.66
  },
  image: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    alignItems: 'flex-start'
  },
  animalInfo: {
    bottom: Dimensions.get('screen').height * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    right: Dimensions.get('screen').width * 1.0,
    height: Dimensions.get('screen').height * 0.07,
    width: Dimensions.get('screen').width * 0.8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#F4F5F7'
  },
  animalInfoHidden: {
    display: 'none'
  },
  infoLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  animalName: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Lato',
    alignItems: 'center',
    paddingTop: 5
  },
  link: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 5,
    borderRadius: 10,
    backgroundColor: '#d7ff43',
    fontSize: responsiveFontSize(2.1),
    fontFamily: 'Lato-Bold',
    padding: Dimensions.get('screen').height * 0.006
  },
  photoCred: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Lato-Bold',
    paddingBottom: 5
  },
  chevronTouch: {
    transform: [{ rotateZ: '180deg' }],
    zIndex: 3,
    position: 'absolute',
    right: 0,
    top: Dimensions.get('screen').height * 0.0055,
    padding: 25
  },
  chevronSelected: {
    transform: [{ rotateZ: '270deg' }]
  }
};
