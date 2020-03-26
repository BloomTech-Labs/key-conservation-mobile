import React, { useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
//import { MapView, Marker, Callout } from 'expo';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import { getOrganizations } from '../../store/actions';

const WideMap = ({ getOrganizations, coords, navigation }) => {
  useEffect(() => {
    getOrganizations();
  }, []);

  const goToProfile = async id => {
    navigation.navigate('Pro', { fromMap: true, selectedProfile: id }); // For BackButton.
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 34.01425,
          longitude: -98.491624,
          latitudeDelta: 38,
          longitudeDelta: 38
        }}
      >
        {coords.map(coordinate => {
          return (
            <Marker
              key={coordinate.user_id}
              pinColor='#00FF9D'
              coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
              }}
              stopPropagation={true}
            >
              <Image
                source={{
                  uri: coordinate.profile_image || undefined
                }}
                style={styles.markerImg}
              />
              <Callout
                onPress={() => goToProfile(coordinate.user_id)}
                style={styles.markerCallout}
              >
                <Text style={styles.calloutOrgName}>{coordinate.name}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};
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
const mapPropsToState = state => {
  const coords = state.filteredOrganization
    .map(org => {
      return {
        user_id: org.user_id,
        latitude: org.latitude,
        longitude: org.longitude,
        name: org.name,
        location: org.location,
        profile_image: org.profile_image
      };
    })
    .filter(coords => coords.latitude && coords.longitude !== null);
  return {
    organizations: state.organizations,
    coords: coords
  };
};
export default connect(mapPropsToState, { getOrganizations })(WideMap);
