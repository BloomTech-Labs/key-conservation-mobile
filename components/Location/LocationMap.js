import React, { useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { getOrganizations } from '../../store/actions';

const LocationMap = ({ getOrganizations, profile }) => {
  useEffect(() => {
    // console.log(profile.latitude + " " + profile.longitude);
    getOrganizations();
  }, []);

  const lat = isNaN(Number(profile.latitude))
    ? 0
    : Number(profile.latitude) - 1;
  const lon = isNaN(Number(profile.longitude)) ? 0 : Number(profile.longitude);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsScale={true}
        initialCamera={{
          center: {
            latitude: lat, // Keeps marker centered.
            longitude: lon
          },
          pitch: 45,
          heading: 0,
          altitude: 1000000,
          zoom: 5
        }}
      >
        {profile.latitude && profile.longitude ? (
          <Marker
            key={Math.random()}
            pinColor='#00FF9D'
            // image={image1}
            coordinate={{
              latitude: profile.latitude,
              longitude: profile.longitude
            }}
          >
            <Image
              source={{
                uri: profile.profile_image
              }}
              style={styles.imageMarker}
            />
            {/* <Callout>
              <Text>{profile.org_name}</Text>
              <MapButton />
            </Callout> */}
          </Marker>
        ) : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  imageMarker: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#00FF9D'
  }
});

const mapPropsToState = state => {
  const coords = state.organizations
    .map(org => {
      return {
        latitude: org.latitude,
        longitude: org.longitude,
        org_name: org.org_name,
        location: org.location
      };
    })
    .filter(coords => coords.latitude && coords.longitude !== null);

  return {
    organizations: state.organizations,
    coords: coords
  };
};

export default connect(mapPropsToState, { getOrganizations })(LocationMap);
