import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
// import Geocode from 'react-geocode'
import LocationIQ from 'react-native-locationiq'

export default class WideMap extends React.Component {


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

      //coordinates code
      // Geocode.setApiKey("AIzaSyCZhFoFDjXjraTbfL16q6LFTZDLJ73S9aM")
      // Geocode.setApiKey("pk.b1c961f18c509bdb2a91cb0a3c0d78ca");
      // Geocode.setLanguage('en');
      // Geocode.fromAddress('New York')
      // .then(res => {
      //   const { lat, lng } = res.results[0].geometry.location;
      //   console.log(lat, lng)
      // },
      // err => {
      //   console.log(err)
      // }
      // );

      LocationIQ.init("pk.b1c961f18c509bdb2a91cb0a3c0d78ca");
      LocationIQ.search("649 N Fairfield Drive")
        .then(json => {
            var lat = json[0].lat;
            var lon = json[0].lon;
            console.log("Coordinates:", lat, lon);
        })
        .catch(error => console.warn(error));
        }


  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} />
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