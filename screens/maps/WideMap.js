import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import LocationIQ from 'react-native-locationiq' // Library for retrieving coordinates

export default class WideMap extends React.Component {
  constructor(props){
  super(props)
    this.state = {
      addresses: {
        latitude: '', 
        longitude: ''
      }
    } // temporarily made state to get coordinates for New York to show up on the map
  }

  componentDidMount() {
    
    var Airtable = require('airtable');
      var base = new Airtable({apiKey: 'keybUdphipr0RgMaa'}).base('appbPeeXUSNCQWwnQ');

      base('Table 1').select({
          // Selecting the first 3 records in Grid view:
          maxRecords: 100,
          view: "Grid view"
      }).eachPage(function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          console.log("START HERE!", records.map(record => {
            return record._rawJson.fields
          }))

          // records.forEach(function(record) {
              
          //     console.log('Retrieved', record.get('org_name'), record.get('address'), record.get('country'));
          // });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();

      }, function done(err) {
          if (err) { console.error(err); return; }
      });
      
      // LocationIQ library to get coordinates for addresses, places
      LocationIQ.init("pk.b1c961f18c509bdb2a91cb0a3c0d78ca"); // API Key from LocationIQ (free)
      LocationIQ.search("New York")
        .then(json => {
            var lat = json[0].lat;
            var lon = json[0].lon;
            this.setState({ addresses: {latitude: parseFloat(lat), longitude: parseFloat(lon)} }) // we used parseInt in order
            // to make the numbers into integers since it made lat and lon into strings. It rounds up and we need to figure out how to keep it
            // decimal
            console.log('coordinates', this.state.addresses)
        })
        .catch(error => console.warn(error));

        
        }

  render() {
    const coordinates = this.state.addresses // set coordinates with addresses object in this.state
    return (
      <View style={styles.container}>
        <MapView 
        style={styles.mapStyle}
        >
          <Marker // a bug pops up but not app breaking: "Warning: Failed prop type: Invalid prop `coordinate.latitude` of type 
          // `string` supplied to `MapMarker`, expected `number`."
          coordinate={coordinates} // coordinate props took in coordinates variable for the coordinates
          title="My HOUSE"
          />
        </MapView>
      </View>
    );
  }
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