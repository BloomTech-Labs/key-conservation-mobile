import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 100,
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    flexWrap: 'wrap',
  },
  headerImageContainer: {
    opacity: 1,
    height: 200,
    width: '100%',
  },
  CircleShapeView: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerTitleContainer: {
    position: 'absolute',
    bottom: (200 - 120) / 2,
    width: '100%',
  },
  headerTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    color: 'black',
  },
});
