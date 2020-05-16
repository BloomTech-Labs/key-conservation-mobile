import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
export default {
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'crimson',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    padding: 24,
  },
  searchIcon: {
    marginRight: 20,
  },
  container: {
    fontFamily: 'Lato',
    justifyContent: 'center',
    paddingBottom: 35,
  },
  orgTitleView: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    resizeMode: 'contain',
    height: deviceWidth <= 415 ? deviceWidth : 415,
  },
  goToCampaignButton: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    width: '100%',
  },
  goToCampaignText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
  },
  campaignDescription: {
    fontFamily: 'Lato',
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15,
  },
  campaignDescriptionText: {
    fontFamily: 'Lato',
    fontSize: 14,
    lineHeight: 19,
  },
  campaignDescriptionName: {
    fontFamily: 'Lato',
    fontSize: 16,
  },
  timeText: {
    color: '#929292',
    fontFamily: 'Lato',
    fontSize: 10,
    marginLeft: 15,
    marginTop: 10,
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
    width: 243,
    marginTop: 20,
  },
  loadMoreText: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#323338',
  },
};
