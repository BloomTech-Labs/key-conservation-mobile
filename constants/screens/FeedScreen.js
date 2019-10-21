import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default {
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchIcon: {
    marginRight: 20
  },
  container: {
    justifyContent: 'center',
    paddingBottom: 35
  },
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchIcon: {
    marginRight: 20
  },
  orgTitleView: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    fontWeight: 'bold'
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    resizeMode: 'contain',
    height: deviceWidth <= 415 ? deviceWidth : 415
  },
  goToCampaignButton: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    width: '100%'
  },
  goToCampaignText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18
  },
  campDesc: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19
  },
  campDescName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16
  },
  timeText: {
    color: '#929292',
    fontSize: 10,
    marginLeft: 15,
    marginTop: 10
  },
  loadMoreView: {
    paddingBottom: 25,
    alignItems: 'center'
  },
  loadMoreTouchable: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#323338',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 28,
    width: 243,
    marginTop: 20
  },
  loadMoreText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#323338'
  }
};
