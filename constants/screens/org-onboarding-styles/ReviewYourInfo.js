import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: Dimensions.get('screen').width
  },
  header: {
    flex: 0,
    padding: '2.5%',
    top: '2.5%',
    flexDirection: 'row'
  },
  arrowView: {
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },
  progressBar: {
    width: '75%',
    alignSelf: 'center',
    padding: '7%',
    top: '5%',
    right: '20%'
  },
  progressBarText: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(1.8),
    paddingTop: 4
  },
  keyboardView: {
    marginVertical: '3%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  obBody: {
    flex: 1,
    backgroundColor: 'white',
    padding: '4%',
    width: Dimensions.get('screen').width
  },
  sectionContainer: {
    paddingTop: 40,
    paddingBottom: 24,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
    position: 'relative'
  },
  obSectionHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
    marginTop: -20,
    marginLeft: -12,
    backgroundColor: 'white',
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    lineHeight: 38
  },
  obSectionHeaderTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    lineHeight: 29,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: 20
  },
  editIcons: {},

  row: {
    // borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  basicInfoRow: {
    // borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: Dimensions.get('screen').height * 0.03
  },
  listContainer: {
    // borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  },

  column: {
    display: 'flex',
    flexDirection: 'column'
    // justifyItems: 'center'
  },

  grayBackground: {
    backgroundColor: '#F3F2F5'
  },

  textArea: {
    borderWidth: 2,
    height: 120,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  obSwitchButton: {
    marginLeft: '5%',
    marginBottom: '1%',
    marginTop: '2%'
  },
  obText: {
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: 18,
    lineHeight: 25,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '7%'
  },
  basicInfoRowTitle: {
    // borderWidth: 2,
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 29,
    marginLeft: '4%',
    marginTop: '2%',
    marginBottom: '2%',
    width: '29%'
  },
  obSubtitleSm: {
    // borderWidth: 2,
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 29,
    marginLeft: '4%',
    marginTop: '2%',
    marginBottom: '2%'
    // width: '29%'
  },
  obFieldName: {
    // borderWidth: 2,
    // backgroundColor: '#F3F2F5',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 19,
    color: '#000000',
    marginLeft: '3%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '1%',
    fontFamily: 'Lato',
    width: '59%'
    // alignItems: 'flex-end'
  },
  obTextBottom: {
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: 18,
    lineHeight: 25,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '7%',
    marginRight: '7%'
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 38,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '7%',
    marginRight: '7%'
  },
  obSubtitle: {
    color: '#000000',
    fontSize: 22,
    lineHeight: 29,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    fontFamily: 'Lato',
    marginRight: '7%'
  },

  textInput: {
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
    borderRadius: 8
    // keyboardType: 'default'
  },
  obNumInput: {
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(196, 196, 196, 0.5)',
    borderRadius: 8
    // keyboardType: 'phone-pad'
  },
  obUploadBtn: {
    backgroundColor: '#00FF9D',
    borderRadius: 8
  },
  obOrgBtn: {
    backgroundColor: '#C4C4C4',
    borderRadius: 24,
    width: 214,
    height: 68
  },
  buttons: {
    alignItems: 'flex-end',
    padding: 0
  }
  //   container: {
  //     fontFamily: 'Lato',
  //     fontStyle: 'normal',
  //     fontSize: 16,
  //     lineHeight: 1.5,
  //     flex: 1,
  //     padding: 16,
  //     marginTop: 40,
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginBottom: '5%'
  //   },
  //   borderContainer: {
  //     paddingTop: 40,
  //     paddingBottom: 24,
  //     marginTop: 30,
  //     marginBottom: 30,
  //     marginLeft: '5%',
  //     marginRight: '5%',
  //     borderRadius: 30,
  //     borderColor: '#00FF9D',
  //     borderWidth: 1,
  //     position: 'relative'
  //   },
  //   opaqueHeader: {
  //     position: 'absolute',
  //     marginTop: -20,
  //     marginLeft: -12,
  //     backgroundColor: 'white',
  //     color: '#000000',
  //     fontFamily: 'Lato-Bold',
  //     fontSize: 20,
  //     lineHeight: 38
  //   },

  //   noBorderConatiner: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'flex-start',
  //     marginLeft: '5%',
  //     marginRight: '5%'
  //   },

  //   row: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     backgroundColor: 'white',
  //     alignItems: 'center'
  //   },

  //   column: {
  //     display: 'flex',
  //     flexDirection: 'column'
  //     // justifyItems: 'center'
  //   },

  //   textInput: {
  //     backgroundColor: '#F3F2F5'
  //   },

  //   textArea: {
  //     height: 120,
  //     backgroundColor: '#F3F2F5',
  //     borderRadius: 15,
  //     paddingLeft: 20,
  //     paddingRight: 20,
  //     paddingTop: 20
  //   },
  //   obSwitchButton: {
  //     marginLeft: '5%',
  //     marginBottom: '1%',
  //     marginTop: '2%'
  //   },
  //   obBody: {
  //     flex: 1,
  //     backgroundColor: 'white',
  //     justifyContent: 'center'
  //   },
  //   obText: {
  //     color: '#000000',
  //     fontFamily: 'Lato',
  //     fontSize: 18,
  //     lineHeight: 25,
  //     marginLeft: '5%',
  //     marginTop: '2%',
  //     marginBottom: '2%',
  //     marginRight: '7%'
  //   },
  //   obTextBottom: {
  //     color: '#000000',
  //     fontFamily: 'Lato',
  //     fontSize: 18,
  //     lineHeight: 25,
  //     marginLeft: '5%',
  //     marginTop: '2%',
  //     marginBottom: '7%',
  //     marginRight: '7%'
  //   },
  //   obTitle: {
  //     color: '#000000',
  //     fontFamily: 'Lato-Bold',
  //     fontSize: 28,
  //     lineHeight: 38,
  //     marginLeft: '5%',
  //     marginTop: '2%',
  //     marginBottom: '7%',
  //     marginRight: '7%'
  //   },
  //   obSubtitle: {
  //     color: '#000000',
  //     fontFamily: 'Lato-Bold',
  //     fontSize: 22,
  //     lineHeight: 29,
  //     marginLeft: '5%',
  //     marginTop: '2%',
  //     marginBottom: '2%',
  //     marginRight: '%'
  //   },
  //   obSubtitleSm: {
  //     color: '#000000',
  //     fontFamily: 'Lato-Bold',
  //     fontSize: 16,
  //     lineHeight: 29,
  //     marginLeft: '5%',
  //     marginTop: '2%',
  //     marginBottom: '2%',
  //     marginRight: '5%'
  //   },
  //   obFwdContainer: {
  //     width: 112,
  //     height: 46,
  //     backgroundColor: '#C4C4C4',
  //     borderRadius: 5,
  //     alignSelf: 'flex-end',
  //     flexDirection: 'column',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginRight: '5%'
  //   },
  //   obFwdBtnText: {
  //     fontFamily: 'Lato-Bold',
  //     fontStyle: 'normal',
  //     fontSize: 18,
  //     lineHeight: 25,
  //     color: '#000000'
  //   },
  //   obRectangle1: {
  //     position: 'absolute',
  //     width: 241,
  //     height: 241,
  //     left: 16,
  //     top: 433,
  //     backgroundColor: '#C4C4C4',
  //     borderWidth: 1,
  //     borderStyle: 'solid',
  //     borderColor: '#C4C4C4'
  //   },
  //   obRectangle2: {
  //     position: 'absolute',
  //     width: 241,
  //     height: 241,
  //     left: 94,
  //     top: 411,
  //     backgroundColor: '#C4C4C4',
  //     borderWidth: 1,
  //     borderStyle: 'solid',
  //     borderColor: '#00FF9D'
  //   },
  //   obFieldName: {
  //     fontFamily: 'Lato',
  //     // fontWeight: 300,
  //     fontSize: 14,
  //     lineHeight: 19,
  //     color: '#000000'
  //   },
  //   obTextInput: {
  //     marginLeft: 20,
  //     marginBottom: 20,
  //     backgroundColor: 'rgba(196, 196, 196, 0.5)',
  //     borderRadius: 8
  //     // keyboardType: 'default'
  //   },
  //   obNumInput: {
  //     marginLeft: 20,
  //     marginBottom: 20,
  //     backgroundColor: 'rgba(196, 196, 196, 0.5)',
  //     borderRadius: 8
  //     // keyboardType: 'phone-pad'
  //   },
  //   obUploadBtn: {
  //     backgroundColor: '#00FF9D',
  //     borderRadius: 8
  //   },
  //   obOrgBtn: {
  //     backgroundColor: '#C4C4C4',
  //     borderRadius: 24,
  //     width: 214,
  //     height: 68
  //   }
});
