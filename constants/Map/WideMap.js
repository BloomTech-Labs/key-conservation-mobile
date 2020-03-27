import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  markerImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#00FF9D',
    padding: 3
  },
  markerCallout: {
    width: 120
  },
  calloutOrgName: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  calloutButton: {
    backgroundColor: '#00FF9D',
    marginTop: 5,
    borderRadius: 3,
    paddingTop: 2,
    paddingBottom: 2
  },
  calloutButtonText: {
    textAlign: 'center'
  }
});

export default styles;
