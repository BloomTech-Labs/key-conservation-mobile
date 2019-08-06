import { CoverageMap } from "istanbul-lib-coverage";

export default {
  // # Campaign.js Styles # //
  container: {
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingBottom: 35,
  },
  donateButton: {
    width: '60%',
    alignSelf: 'center'
  },
  listItem: {
    color: 'black',
    backgroundColor: 'black'
  },
  campDesc: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 15,
    paddingTop: 15
  },
  campDescUsername: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: '100%',
    height: 50
  },
  touchableView: {
    backgroundColor: '#00ff9d',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243,
    
  },
  touchableText: {
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    resizeMode: 'cover',
    height: 300
  },
  campTitle:{
    backgroundColor: '#323338',
    color: '#fff',
    height: 32,
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 7,
  },
  // # End of Campaign.js Styles # //

  // # FeedScreen.js Styles  # //

  feedContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  searchIcon: { marginRight: 20 }

  // # End of FeedScreen.js Styles  # //

  // # DetailAboutUs.js Styles  # //

  // # End of DetailAboutUs.js Styles  # //
};
