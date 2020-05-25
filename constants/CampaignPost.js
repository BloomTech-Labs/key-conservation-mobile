import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  name: {
    flexDirection: 'row',
    marginLeft: -10,
    width: '100%',
  },
  ellipse: {
    paddingTop: 3,
    paddingLeft: 5,
  },
  searchIcon: {
    marginRight: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F2FB',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingTop: 7,
    paddingBottom: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  orgTitleView: {
    fontFamily: 'Lato',
    fontSize: 17,
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    width: '100%',
    flex: 1,
    height: deviceWidth,
    marginTop: 3,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToCampaignButton: {
    backgroundColor: 'rgba(0, 255, 157, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    height: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 8,
  },
  topRowLeft: {
    paddingLeft: 9,
    width: '75%',
  },
  topRowRight: {
    paddingRight: 10,
  },
  postTitle: {
    paddingRight: 15,
    flex: 2,
    fontFamily: 'Lato-Bold',
    fontSize: 17,
  },
  timeText: {
    color: '#929292',
    fontSize: 16,
    fontFamily: 'Lato',
  },
  bookmarks: {
    marginHorizontal: 20,
  },
  bookmarkOutline: {
    fontSize: 28,
    color: 'black',
  },
  bookmarkFill: {
    fontSize: 30,
    color: '#00FF9D',
  },
  goToCampaignText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
  },
  campaignDescription: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  campaignDescriptionName: {
    fontFamily: 'Lato-Bold',
    fontSize: 17,
    paddingBottom: 10,
  },
  campaignDescriptionText: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19,
  },
  updateBar: {
    backgroundColor: 'rgba(202,255,0, 0.7)',
    height: 37,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBarText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    letterSpacing: 5,
    color: 'black',
  },
  rightSectionBookmark: {
    borderRadius: 12,
    marginTop: 10,
    marginRight: 3,
    backgroundColor: '#F5F5F5',
    paddingTop: 10,
    paddingLeft: 6,
    paddingRight: 6,
    height: 42,
  },
  rightSectionComment: {
    borderRadius: 12,
    marginTop: 10,
    marginRight: 3,
    backgroundColor: '#F5F5F5',
    paddingTop: 6,
    paddingLeft: 6,
    paddingRight: 6,
    height: 42,
  },
  listItemStyle: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  readMore: {
    color: '#929292',
  },
  urgencyBarText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    letterSpacing: 5,
    color: 'white',
  },
  demarcation: {
    marginTop: 5,
  },
  subtitleText: {
    color: '#929292',
  },
  campaignControls: {
    flexDirection: 'row',
  },
  campaignControlsLeft: {
    flexDirection: 'row',
    flex: 2,
  },
  campaignControlsRight: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 7,
  },
});
