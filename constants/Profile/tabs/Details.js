import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2FB',
    paddingHorizontal: 8
  },
  sections: {
    marginTop: 8,
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    fontSize: 15
  },
  SocialContainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 15,
    marginLeft: 35,
    paddingBottom: 10,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0
  },
  iconWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 2,
    paddingBottom: 20
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
    fontFamily: 'Lato'
  },
  body: {
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    fontSize: 15,
    fontFamily: 'Lato'
  },
  campMission: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 5,
    width: '100%',
    fontFamily: 'Lato',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 8
  },
  donateTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
    fontFamily: 'Lato-Bold'
  },
  donateButton: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24
  },
  donateText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Lato-Bold'
  }
});
