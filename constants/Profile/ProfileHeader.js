import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 100
  },
  contentContainer: {
    position: 'absolute',
    top: '50%',
    // Hardcoding for android because there is a React Native bug preventing
    // string values for transforms to work
    transform: [{ translateY: Platform.OS === 'android' ? -50 : '-50%' }],
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    flexWrap: 'wrap'
  },
  headerTitleContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    zIndex: -1,
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: 'white'
  },
  avatarContainer: {
    width: '30%',
    flex: 0,
    alignItems: 'center'
  },
  bioContainer: {
    marginTop: 25,
    marginBottom: 25,
    width: '80%'
  },
  socialContainer: {
    flexDirection: 'row',
    width: 175,
    marginTop: 10,
    marginLeft: 3,
    justifyContent: 'flex-start'
  },
  socialIcon: {
    paddingRight: 12,
    marginRight: 4
  },
  bio: {
    color: 'white',
    fontFamily: 'Lato'
  },
  org: {
    lineHeight: 22,
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: 'white'
  },
  outline: {
    fontSize: 18,
    fontFamily: 'Lato',
    color: 'white'
  },
  locationText: {
    flexDirection: 'row',
    lineHeight: 19,
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'white'
  },
  userText: {
    lineHeight: 19,
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'white'
  },
  websiteText: {
    lineHeight: 19,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: 'white'
  },
  textContainer: {
    flex: 1,
    color: 'white'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2
  },
  TouchableOpacity: {
    flex: 1
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },

  CampaignButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold'
  },
  DetailButton: {
    fontSize: 18,
    color: '#C4C4C4',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold'
  }
});

export default styles;
