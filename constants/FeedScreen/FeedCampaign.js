import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default {
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  name: {
    flexDirection: 'row',
    marginLeft: -10,
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
    fontFamily: 'Lato-Bold',
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
  rightSection: {
    borderRadius: 12,
    marginTop: 12,
    marginRight: 3,
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 16,
    backgroundColor: '#F5F5F5',
    paddingTop: 6,
    paddingLeft: 8,
    paddingRight: 8,
    height: 45,
  },
  readMore: {
    color: '#929292',
  },
  timeText: {
    color: '#929292',
    fontSize: 10,
    fontFamily: 'Lato',
    marginTop: 10,
    paddingBottom: 5,
  },
  urgencyBarText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    letterSpacing: 5,
    color: 'white',
  },
  demarcation: {
    marginTop: 10,
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
    marginRight: 7,
  },
};
