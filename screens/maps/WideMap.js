import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button, Alert, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import { getOrganizations } from "../../store/actions";
import MapButton from "../../components/MapButton";

const WideMap = ({ getOrganizations, coords, navigation }) => {

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
            coordinate={{
              latitude: coordinate.latitude, 
              longitude: coordinate.longitude 
              }}
            stopPropagation={true}
          >
            <Callout onPress={() => navigation.navigate('HeyThere')}>
            <Text>{coordinate.org_name}</Text>
            <Text>{coordinate.location}</Text>
            
                <TouchableOpacity onPress={() => console.log("WHEEEEEE!!!")}>
                  <Text>Click Me</Text>
                  </TouchableOpacity>
              
            </Callout>
          </Marker>
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

export default connect(mapPropsToState, { getOrganizations })(WideMap);
