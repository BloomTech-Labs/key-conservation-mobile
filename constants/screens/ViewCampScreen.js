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
    fontFamily: 'OpenSans-Regular',
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16
  },
  donateButton: {
    fontFamily: 'OpenSans-SemiBold',
    width: '60%',
    alignSelf: 'center'
  },
  supportMissionText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    paddingLeft: 10
  },
  campMissionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19,
    paddingTop: 10
  },
  campMission: {
    width: '68%',
    fontFamily: 'OpenSans-Regular',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 20,
    paddingTop: 19,
    borderTopWidth: 2,
    borderTopColor: '#eee'
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    resizeMode: 'contain',
    height: deviceWidth <= 415 ? deviceWidth : 415
  },
  campDescContain: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    lineHeight: 22
  },
  campDesc: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 19
  },
  listUsername: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    lineHeight: 22
  },
  donateView: {
    alignItems: 'center',
    marginBottom: 50
  },
  whiteSpace: {
    height: 40
  }
};
