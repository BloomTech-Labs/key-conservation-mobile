import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

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