import { StyleSheet, Dimensions } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    paddingTop: 0,
    paddingBottom: 64,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1,
    paddingBottom: 24,
    paddingTop: 0,
    marginBottom: 48
  },
  user_info: {
    padding: 20,
    paddingTop: 32,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingBottom: 16
  },
  reports: {
    marginHorizontal: 20
  },
  user_image_container: {
    width: 96,
    height: 96,
    marginRight: 16
  },
  user_image: {
    flex: 1,
    borderRadius: 100,
    width: null,
    height: null,
    backgroundColor: 'gray'
  },
  user_details: {
    flex: 1,
    flexDirection: 'column'
  },
  arrow_icon_container: {
    transform: [{ rotate: '180deg' }]
  },
  user_name: {
    fontWeight: 'bold',
    fontSize: 20
  },
  user_detail: {
    color: 'gray',
    fontSize: 11
  },
  deactivate_btn_container: {
    padding: 11,
    flex: 1,
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 8,
    borderColor: 'crimson',
    alignSelf: 'stretch'
  },
  deactivate_btn: {
    color: 'crimson',
    fontSize: 15,
    textAlign: 'center'
  },
  other_reports_section: {
    flex: 1,
    paddingVertical: 12,
    borderTopWidth: 1,
    marginVertical: 8,
    marginBottom: 16
  },
  other_section_header: {
    fontWeight: 'bold',
    fontSize: 16
  }
});
