import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
// import Geocode from 'react-geocode'
import LocationIQ from 'react-native-locationiq';

const WideMap = (props) => {

  const [coordinates, setCoordinates] = useState({latitude: '', longitude: ''});

  

  useEffect(() => {
      }, []);


      LocationIQ.init("pk.b1c961f18c509bdb2a91cb0a3c0d78ca");
      LocationIQ.search("Eiffel Tower, Paris, France")
        .then(json => {
            var lat = json[0].lat;
            var lon = json[0].lon;
            console.log("Coordinates:", lat, lon);
            setCoordinates({latitude: parseFloat(lat), longitude: parseFloat(lon)})
        })
        .catch(error => console.warn(error));

console.log("COORDINATES!!!!!", coordinates)
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}>
          <Marker 
            title="Eiffel Tower" 
            coordinate={coordinates}
          />
        </MapView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default WideMap;