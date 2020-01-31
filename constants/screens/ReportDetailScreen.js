import { StyleSheet, Dimensions } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: "white"
  },
});
