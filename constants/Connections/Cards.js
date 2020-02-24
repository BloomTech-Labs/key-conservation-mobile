import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    width: '95%',
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 10
  },
  card: {
    marginVertical: 7
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%'
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  peopleCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    paddingLeft: 20,
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#3b3b3b'
  },
  statusButtons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#f5f5f5',
    padding: 6,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18
  }
});

export default styles;
