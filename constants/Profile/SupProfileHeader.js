import { withTheme } from 'react-native-elements';

export default {
  container: {
    height: 163,
    flexDirection: 'row'
  },
  rightContainer: {
    paddingTop: 29,
    flex: 1
  },
  leftContainer: {
    paddingTop: 29,
    flex: 0,
    width: '30%',
    alignItems: 'center'
  },
  textContainer: {
    paddingTop: 2,
    height: 61
  },
  titleText: {
    lineHeight: 22,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: 'white'
  },
  userText: {
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'Lato',
    color: 'white'
  },
  socialContainer: {
    flexDirection: 'row',
    width: 175,
    marginTop: 10,
    marginLeft: 3,
    justifyContent: 'space-between'
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
  DetailButton: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold'
  }
};
