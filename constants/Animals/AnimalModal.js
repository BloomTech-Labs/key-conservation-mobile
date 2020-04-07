import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(243, 244, 246, 0.20)'
  },
  headerContainer: {
    top: Dimensions.get('screen').height * 0.03, // shows up differently on ios and android, 3% is middle ground so back-arrow in ios is not over the time display, but not excessive space on android
    flex: 1
  },
  backArrowTouch: {
    zIndex: 3,
    flex: 0,
    alignSelf: 'flex-start',
    padding: 10
  },
  headerInfo: {
    flex: 1,
    bottom: Dimensions.get('screen').height * 0.05
  },
  headerTitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Dimensions.get('screen').width * 0.05
  },
  keyIcon: {
    flex: 0,
    padding: 12
  },
  title: {
    flex: 0,
    alignSelf: 'center',
    fontFamily: 'Lato-Bold',
    color: '#F4F5F7',
    fontSize: responsiveFontSize(3.3) // 3.3% of total screen size
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    marginHorizontal: Dimensions.get('screen').height * 0.07,
    left: Dimensions.get('screen').height * 0.03,
    marginTop: Dimensions.get('screen').height * 0.05
  },
  text: {
    justifyContent: 'flex-start',
    fontFamily: 'Lato-Bold',
    color: '#F4F5F7',
    fontSize: responsiveFontSize(2.4), // 2.4% of total screen size
    bottom: Dimensions.get('screen').height * 0.03
  },
  listContainer: {
    flex: 2,
    backgroundColor: '#3b3b3b'
  }
});

export default styles;
