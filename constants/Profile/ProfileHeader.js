import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 100
  },
  contentContainer: {
    position: 'absolute',
    // Hardcoding for android because there is a React Native bug preventing
    // string values for transforms to work
    // transform: [{ translateY: Platform.OS === 'android' ? -50 : '-50%' }],
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    // paddingBottom: 30,
    flexWrap: 'wrap'
  },
  textContainer: {
    flex: 1,
    color: 'white',
    marginLeft: 5,
    marginTop: 25
  },
  headerTitleContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%'
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
    width: '25%',
    paddingTop: 10,
    marginLeft: 20,
    flex: 0,
    alignItems: 'center'
  },
  bioContainer: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30
  },
  bioText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 17
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
    marginTop: 10,
    marginBottom: 10,
    flex: 1
  },
  CampaignButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold'
  },
  buttonContainer: {
    paddingHorizontal: 30,
    borderLeftWidth: 2,
    borderColor: 'white',
    width: '45%'
  },
  connectButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    fontFamily: 'Lato-Bold',
    marginVertical: 5,
    alignSelf: 'flex-end',
    width: '100%'
  },
  connectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  connectText: {
    color: 'white',
    paddingHorizontal: 45
  },
  textNumber: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  textWord: {
    color: 'white',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    fontSize: 18
  },
  DetailButton: {
    fontSize: 18,
    color: '#C4C4C4',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold'
  }
});
