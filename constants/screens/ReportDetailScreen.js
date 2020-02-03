import { StyleSheet, Dimensions } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    padding: 24,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: "white"
  },
  user_info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingBottom: 16,
    borderBottomWidth: 1
  },
  user_image_container: {
    width: 128,
    height: 128,
    marginRight: 16
  }, 
  user_image: {
    flex: 1,
    borderRadius: 100,
    width: null,
    height: null
  },
  user_details: {
    flex: 1,
    flexDirection: 'column'
  },
  user_name: {
    fontWeight: 'bold',
    fontSize: 20
  },
  user_detail: {
    color: 'gray',
    fontSize: 11
  }
});
