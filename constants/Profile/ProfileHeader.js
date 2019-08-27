export default {
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e1e8ed',
    paddingTop: 29,
    flexWrap: 'wrap'
  },
  avatarContainer: {
    width: '30%',
    flex: 0,
    alignItems: 'center'
  },
  bioContainer: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 90,
    marginRight: 60,
    textAlign: 'center',
    alignItems: 'center'
  },
  bio: {
    marginBottom: 50
  },
  org: {
    lineHeight: 22,
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold'
  },
  pic: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    paddingTop: 2,
    height: 61
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2
  },
  TouchableOpacity: {
    flex: 1
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },

  CampaignButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold'
  },
  DetailButton: {
    fontSize: 18,
    color: '#C4C4C4',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBold'
  }
};
