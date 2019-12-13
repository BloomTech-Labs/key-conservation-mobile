import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { 
  StyleSheet,
  View,
  Dimensions,
  Image
} from "react-native";
import { connect } from "react-redux";
import { getOrganizations } from "../../store/actions";


const LocationMap = ({ getOrganizations, profile }) => {
  useEffect(() => {
    console.log(profile.latitude + " " + profile.longitude);
    console.log(profile);
    getOrganizations();
  }, []);

  const image2 = profile.profile_image;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsScale={true}
        initialRegion={{
          latitude: profile.latitude,
          longitude: profile.longitude,
          latitudeDelta: 10,
          longitudeDelta: 10
        }}
      >
        {profile.latitude && profile.longitude ? (
          <Marker
            key={Math.random()}
            pinColor="#00FF9D"
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
            <Callout>
              <Text>{profile.org_name}</Text>
              <MapButton />
            </Callout>
          </Marker>
        ) : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  imageMarker: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#00FF9D"
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
