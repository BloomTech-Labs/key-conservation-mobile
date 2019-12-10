import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import {getOrganizations} from '../../store/actions'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
// import Geocode from 'react-geocode'
import LocationIQ from 'react-native-locationiq';
​
const WideMap = (props) => {
    const [coordinates, setCoordinates] = useState();
    useEffect( () => {
        props.getOrganizations();
    }, []);
    
    useEffect( () => {
        props.locations.map(location => {
            convertLocationToCoords(location)
        })
        return;
    }, [props.locations]);
    
    //
    const convertLocationToCoords = (location)=>{
        console.log('convertLocationToCoords - ', location)
        LocationIQ.init("pk.b1c961f18c509bdb2a91cb0a3c0d78ca");
        LocationIQ.search(location)
       
        // LocationIQ.search("Eiffel Tower, Paris, France")
        .then(json => {
            // return json.
            console.log('json', json)
            var lat = json[0].lat;
            var lon = json[0].lon;
            // console.log("Coordinates:", lat, lon);
            setCoordinates({latitude: parseFloat(lat), longitude: parseFloat(lon)})
        })
        .catch(error => console.warn(error));
    }
    //
    
    // console.log("COORDINATES!!!!!", coordinates)
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
​
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
​
const mapPropsToState = (state)=>{
    const locations = state.organizations.map(org => {
        return org.location
    }).filter(location => location!==null)
    
    console.log('organizations', locations)
    return {
        organizations: state.organizations,
        locations: locations
    }
}
​
export default connect(
  mapPropsToState,
 {getOrganizations})
 (WideMap);