import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { getOrganizations } from "../../store/actions";

const WideMap = ({ getOrganizations, coords }) => {



  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}>
        {coords.map(coordinate => {
          console.log("coordinate", coordinate);
          return <Marker 
            key={coordinate.longitude}
            pinColor="#00FF9D" 
            coordinate={coordinate} 
          />;
        })}
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
        longitude: org.longitude
      };
    })
    .filter(coords => coords.latitude && coords.longitude !== null);

  return {
    organizations: state.organizations,
    coords: coords
  };
};

export default connect(
  mapPropsToState,
 {getOrganizations})
 (WideMap);