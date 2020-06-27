import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  blur: {
    flex: 1,
  },
  mainContainer: {
    borderWidth: 1,
  },
  container: {
    width: 180,
    position: 'absolute',
    top: -8,
    left: -180,
    zIndex: 99,
    overflow: 'hidden',
    borderRadius: 4,
  },
  button: {
    padding: 12,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Lato-Bold',
  },
});
