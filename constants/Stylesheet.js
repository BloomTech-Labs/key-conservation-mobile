import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width
export default {
  // # Campaign.js Styles # //
  container: {
    justifyContent: 'center',
    // marginBottom: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: '#eee',
    paddingBottom: 35,
  },
  donateButton: {
    fontFamily: 'OpenSans-SemiBold',
    width: '60%',
    alignSelf: 'center'
  },
  listItem: {
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    backgroundColor: 'black'
  },
  campDesc: {
    
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19,
  },
  campDescName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16
  },
  campDescUsername: {
    fontFamily: 'OpenSans-SemiBold',
    paddingRight: 15
  },
  readMore: {
    color: "#929292"
  },  
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
    width: 243
  },
  touchableText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16
  },
  goToCampaignButton: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    width: '100%',
  },
  goToCampaignText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,

  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    resizeMode: 'contain',
    height: deviceWidth <= 415 ? deviceWidth : 415
  },
  campTitle: {
    fontFamily: 'OpenSans-Regular',
    backgroundColor: '#323338',
    color: '#fff',
    height: 32,
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 7
  },
  orgTitleView: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    fontWeight: 'bold'
  },
  orgLocation: {
    fontFamily: 'OpenSans-Regular'
  },
  campMissionText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    paddingLeft: 10
  },
  campMission: {
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 20
  },
  
  // # End of Campaign.js Styles # //

  // # FeedScreen.js Styles  # //

  feedContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchIcon: { 
    marginRight: 20 
  },
  timeText: {
    color: '#929292',
    fontSize: 10, 
    marginLeft: 15,
    marginTop: 10
  },
  loadMoreView: {
    paddingBottom: 25,
    alignItems: 'center',
  },
  loadMoreTouchable: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#323338',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 28,
    width: 243
  },
  loadMoreText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#323338',
  },


  // # End of FeedScreen.js Styles  # //

  // # DetailAboutUs.js Styles  # //

  // # End of DetailAboutUs.js Styles  # //

  // # FeedUpdate.js Styles # //
  updateBar: {
    backgroundColor: '#323338',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    width: '100%',
  },
  updateBarText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: '#fff',
  }

  // # End of FeedUpdate.js Styles # //
};
