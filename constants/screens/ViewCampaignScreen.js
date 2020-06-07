import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: '100%',
    height: 50,
  },
  touchableView: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243,
  },
  touchableText: {
    fontFamily: 'Lato',
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F2FB',
  },
  commentsView: {
    width: '100%',
    fontSize: 14,
    fontFamily: 'Lato',
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: 'white',
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
    marginVertical: 10,
  },
  ogPostButton: {
    fontFamily: 'Lato-Bold',
    width: '60%',
    alignSelf: 'center',
  },
  campaignDescriptionContainer: {
    marginLeft: 15,
    paddingBottom: 15,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  campaignDescriptionName: {
    fontFamily: 'Lato',
    fontSize: 17,
    lineHeight: 22,
    paddingBottom: 10,
  },
  campaignDescription: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19,
  },
  listName: {
    fontFamily: 'Lato',
    fontSize: 17,
    lineHeight: 22,
    paddingBottom: 3,
  },
  donateView: {
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 8,
  },
  whiteSpace: {
    height: 40,
  },
  icon: {
    fontSize: 28,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  bookmarks: {
    marginHorizontal: 15,
  },
  bookmarkOutline: {
    fontSize: 28,
    color: 'black',
  },
  bookmarkFill: {
    fontSize: 30,
    color: '#00FF9D',
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
  viewOriginalPost: {
    backgroundColor: 'dodgerblue',
    height: 40,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  viewOriginalPostText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  campaignControls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  campaignControlsLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  campaignControlsRight: {
    flexDirection: 'row-reverse',
    flex: 1,
  },
  rightSectionBookmark: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});
