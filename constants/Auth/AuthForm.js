import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 72,
    marginBottom: -48,
    overflow: 'hidden'
  },
  loading: {
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14
  },
  backButton: {
    padding: 8,
    paddingRight: 16
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22
  },
  tabSelector: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50,
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 2
    }
    
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tab: {
    paddingTop: 10,
    height: '100%',
    alignItems: 'center'

  },
  tabText: {
    flex: 1,
    letterSpacing: 0.7,
    fontSize: 19,
    paddingHorizontal: 16,
    fontFamily: 'Lato-Bold'
  },
  selectedTab: {
    width: '100%',
    backgroundColor: '#00FF9D',
    height: 3
  },
  formContent: {
    padding: 16,
    paddingTop: 0,
    flex: 1
  }
});
