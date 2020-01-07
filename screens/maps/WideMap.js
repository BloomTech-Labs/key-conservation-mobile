import React, { useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import { getOrganizations, getProfileData } from '../../store/actions';
const WideMap = ({ getProfileData, getOrganizations, coords, navigation }) => {
  useEffect(() => {
    getOrganizations();
  }, []);

  const goToProfile = async id => {
    await getProfileData(id);
    navigation.navigate('Pro', { fromMap: true }); // For BackButton.
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
              key={coordinate.users_id}
              pinColor='#00FF9D'
              coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
              }}
              stopPropagation={true}
            >
              <Image
                source={{
                  uri: coordinate.profile_image
                }}
                style={styles.markerImg}
              />
              <Callout
                onPress={() => goToProfile(coordinate.users_id)}
                style={styles.markerCallout}
              >
                <Text style={styles.calloutOrgName}>{coordinate.org_name}</Text>
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
    width: 70
  },
  calloutOrgName: {
    fontWeight: 'bold'
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
        users_id: org.users_id,
        latitude: org.latitude,
        longitude: org.longitude,
        org_name: org.org_name,
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
export default connect(mapPropsToState, { getOrganizations, getProfileData })(
  WideMap
);
