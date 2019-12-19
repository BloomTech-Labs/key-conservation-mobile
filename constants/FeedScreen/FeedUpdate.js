import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    justifyContent: 'center',
    paddingBottom: 2
  },
  orgTitleView: {
    fontFamily: 'Lato',
    fontSize: 17
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
    alignItems: 'center'
  },
  updateBarText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: 'black'
  },
  iconRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 20,
    marginTop: 15,
    height: 30
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    flex: 1,
    height: deviceWidth,
    width: deviceWidth
  },
  indicator: {
    position: 'absolute',
    marginTop: 180,
    marginLeft: 162,
    zIndex: 2
  },
  goToCampaignButton: {
    backgroundColor: 'rgba(0, 255, 157, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  goToCampaignText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18
  },
  likesContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center'
  },
  campDesc: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescName: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    paddingBottom: 10
  },
  campDescText: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 19
  },
  readMore: {
    color: '#929292'
  },
  timeText: {
    color: '#929292',
    fontSize: 10,
    fontFamily: 'Lato',
    marginLeft: 15,
    marginTop: 15,
    paddingBottom: 3
  },
  subtitleText: {
    fontFamily: 'Lato'
  },
  demarcation: {
    marginTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#eee'
  }
};
