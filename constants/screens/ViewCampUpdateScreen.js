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
  campMissionText: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19,
    paddingTop: 10
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    // resizeMode: 'contain',
    // height: deviceWidth <= 415 ? deviceWidth : 415
    flex: 1,
    height: deviceWidth,
    width: deviceWidth
  },
  campDescContain: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 22,
    paddingBottom: 10
  },
  campDesc: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19,
    paddingBottom: 15
  },
  listName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 22
  },
  ogPostView: {
    alignItems: 'center'
  },
  ogBorder: {
    marginLeft: '16%',
    marginRight: '16%',
    marginTop: 20,
    paddingTop: 19,
    borderTopWidth: 2,
    borderTopColor: '#eee'
  },
  whiteSpace: {
    height: 40
  }
});
