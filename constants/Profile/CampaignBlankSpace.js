import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 15,
    color: '#505050'
  },
  plusIcon: {
    alignItems: 'center'
  }
});

export default styles;