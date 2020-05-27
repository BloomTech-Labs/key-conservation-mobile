import { StyleSheet } from 'react-native';

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
    paddingLeft: 17,
    width: '75%',
  },
  topRowRight: {
    paddingRight: 15,
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
  rightSection: {
    borderRadius: 12,
    marginTop: 12,
    marginRight: 3,
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 16,
    backgroundColor: '#F5F5F5',
    paddingTop: 5,
    paddingLeft: 6,
    paddingRight: 6,
    height: 42,
  },
  readMore: {
    color: '#929292',
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
    paddingRight: 7,
  },
});
