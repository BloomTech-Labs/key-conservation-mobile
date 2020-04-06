import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    width: '95%',
    backgroundColor: '#f2f2fb',
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
  noConnections: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#3b3b3b',
    alignSelf: 'center'
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
  },
  addProjectsButton: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 5
  }
});

export default styles;
