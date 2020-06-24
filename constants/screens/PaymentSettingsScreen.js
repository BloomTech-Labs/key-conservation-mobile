import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'crimson',
    fontFamily: 'Lato-Bold',
  },
  progressBar: {
    height: 6,
    shadowOpacity: 1,
    shadowColor: 'dodgerblue',
    shadowRadius: 5,
    backgroundColor: 'dodgerblue',
    zIndex: 99,
  },
  fill: {
    flex: 1,
    height: '100%',
    backgroundColor: 'dodgerblue',
  },
});
