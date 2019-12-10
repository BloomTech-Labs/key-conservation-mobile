import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { getOrganizations } from "../../store/actions";
import LocationIQ from "react-native-locationiq";

const WideMap = ({ organizations, getOrganizations, coords }) => {
  useEffect(() => {
    getOrganizations();
  }, []);

  // setCoords();

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}>
        {coords.map(coordinate => {
          // console.log("coordinate", coordinate);
          return (
            <Marker
              coordinate={coordinate}
              stopPropagation={true}
              onPress={e => console.log("*** IT HAS BEEN PRESSED ***")}
              key={Math.random()}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //     // flex: 1,
  //     // backgroundColor: '#fff',
  //     // alignItems: 'center',
  //     // justifyContent: 'center',
  // },
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

  // console.log("coords", coords);
  return {
    organizations: state.organizations,
    coords: coords
  };
};

export default connect(mapPropsToState, { getOrganizations })(WideMap);
