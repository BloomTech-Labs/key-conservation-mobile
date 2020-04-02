import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default {
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: '100%',
    height: 50
  },
  touchableView: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243
  },
  touchableText: {
    fontFamily: 'Lato',
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F2FB',
    paddingTop: 5
  },

  container: {
    overflow: 'hidden',
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingTop: 7,
    paddingBottom: 20,
    borderRadius: 10,
    marginTop: 5
  },
  ogPostButton: {
    fontFamily: 'Lato-Bold',
    width: '60%',
    alignSelf: 'center'
  },
  supportMissionText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    paddingLeft: 10
  },
  campaignMissionText: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19,
    paddingTop: 10
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    width: '100%',
    flex: 1,
    height: deviceWidth,
    marginTop: 3
  },
  campaignDescriptionContainer: {
    marginLeft: 15,
    paddingBottom: 15,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  campaignDescriptionName: {
    fontFamily: 'Lato-Bold',
    fontSize: 17,
    lineHeight: 22,
    paddingBottom: 10
  },
  campaignDescription: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19
  },
  listName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    paddingBottom: 3
  },
  donateView: {
    alignItems: 'center',
    marginBottom: 50
  },
  whiteSpace: {
    height: 40
  },
  icon: {
    fontSize: 28,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  bookmarks: {
    marginHorizontal: 15
  },
  bookmarkOutline: {
    fontSize: 28,
    color: 'black'
  },
  bookmarkFill: {
    fontSize: 30,
    color: '#00FF9D'
  },
  timeText: {
    color: '#929292',
    fontSize: 10,
    marginLeft: 0,
    marginRight: 15,
    marginTop: 15
  }
};
