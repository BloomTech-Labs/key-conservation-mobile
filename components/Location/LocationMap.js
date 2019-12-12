import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import { connect } from "react-redux";
import { getOrganizations } from "../../store/actions";

import MapButton from "../../components/MapButton";

const LocationMap = ({ getOrganizations, profile }) => {
  useEffect(() => {
    console.log(profile.latitude + " " + profile.longitude);
    getOrganizations();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}>
        <Marker
          key={Math.random()}
          pinColor="#00FF9D"
          coordinate={{
            latitude: profile.latitude,
            longitude: profile.longitude
          }}
          stopPropagation={true}
        >
          <Callout>
            {/* <Text>{data.org_name}</Text> */}
            <MapButton />
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
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
