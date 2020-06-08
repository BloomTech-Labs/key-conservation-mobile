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
  rightSectionBookmark: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    height: 44,
    width: 44,
    justifyContent: 'center',
    margin: 2,
    alignItems: 'center'
  },
  rightSectionComment: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    height: 44,
    width: 48,
    margin: 2,
    paddingLeft: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemStyle: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  readMore: {
    color: '#929292',
  },
  demarcation: {
    marginTop: 5,
  },
  subtitleText: {
    color: '#929292',
  },
  campaignControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    flex: 1,
  },
  campaignControlsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  campaignControlsRight: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
  },
});
