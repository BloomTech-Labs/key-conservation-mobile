import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'gray'
  },
  sectionButton: {
    alignSelf: 'center',
    marginBottom: 10
  },
  touchableView: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243,
    marginBottom: 10
  },
  touchableText: {
    fontFamily: 'Lato-Bold',
    color: 'white',
    fontSize: 10,
    textAlign: 'center'
  },
  imageButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editOverlay: {
    backgroundColor: 'black',
    opacity: 0.8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 16
  },
  imageContain: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1
  }
});
