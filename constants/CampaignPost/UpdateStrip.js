import { StyleSheet, Dimensions } from 'react-native';

const TILE_SIZE = (Dimensions.get('window').width - 56) / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  updateTile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: 'gray',
    overflow: 'hidden',
    marginRight: 8,
    borderRadius: 10,
  },
  tileContainer: {
    flex: 1,
    alignContent: 'flex-start',
    paddingBottom: 10
  },
  dateContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 24,
    alignItems: 'center'
  },
  date: {
    color: 'white',
  },
  image: {
      flex: 1,
  },
  header: {
      flex: 1,
      flexDirection: 'row',
      paddingBottom: 12,
      justifyContent: 'space-between',
  },
  title: {
      fontFamily: 'Lato-Bold',
      color: 'black',
      fontSize: 18
  }
});
