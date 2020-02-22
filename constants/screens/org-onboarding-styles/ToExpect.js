import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  obBody: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '10%'
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 38,
    marginLeft: '8%',
    marginTop: '18%',
    marginBottom: '2%',
    marginRight: '7%'
  },
  contentWrapper: {
    display: 'flex',
    marginLeft: '8%',
    marginRight: '5%',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginTop: '5%'
  },
  iconWrapper: {
    marginTop: '2.5%'
  },
  obSubtitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 21,
    lineHeight: 29,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '7%'
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
  arrowView: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    top: '9%',
    left: '1.5%',
    zIndex: 3,
    padding: '2.5%'
    // top: '2.5%'
  },
  buttons: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: '5%'
  }
});
