import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
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
    padding: '4%'
  },
  borderContainer: {
    paddingTop: 40,
    paddingBottom: 24,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 40,
    borderColor: '#000',
    borderWidth: 1,
    position: 'relative'
  },
  opaqueHeader: {
    position: 'absolute',
    marginTop: -20,
    marginLeft: -12,
    backgroundColor: 'white',
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    lineHeight: 38
  },

  //   noBorderContainer: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'flex-start',
  //     marginLeft: '5%',
  //     marginRight: '5%'
  //   },

  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center'
  },

  column: {
    display: 'flex',
    flexDirection: 'column'
    // justifyItems: 'center'
  },

  //   textInput: {
  //     backgroundColor: '#F3F2F5'
  //   },

  textArea: {
    height: 120,
    backgroundColor: '#F3F2F5',
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
  obFieldName: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 19,
    color: '#000000',
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '7%'
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
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    lineHeight: 29,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: 20
  },
  obSubtitleSm: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 29,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '5%'
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
  }
});
