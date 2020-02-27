import * as React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import styles from '../constants/screens/org-onboarding-styles/TellAboutOrg.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDestination = this.onChangeDestination.bind(this);
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );
    this.selectPlace = this.selectPlace.bind(this)
    this.state = {
      error: '',
      latitude: 0,
      longitude: 0,
      destination: '',
      predictions: [],
      place_id: ''
    };
  }

 key = 'AIzaSyDuTcsNOBuOXdlG03JJMvVRXIKW55tVL8I'

  selectPlace() {
    const placeIdUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${}&fields=geometry&key=${key}`
    const coords = await fetch(placeIdUrl)
    const coordsJson = await result.json()
    console.log('coordsJson') 
  }

  async onChangeDestination(destination) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}&key=${key}&libraries=places&location=${this.state.latitude},${this.state.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      

      this.setState({
        predictions: json.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const predictions = this.state.predictions.map(prediction => (
      <Text key={prediction.id}>{prediction.description}</Text>
    ));
    return (
      <View>
        <TextInput
          placeholder='Address'
          style={styles.obTextInput}
          onChangeText={destination => {
            this.setState({ destination });
            this.onChangeDestinationDebounced(destination);
          }}
          value={this.state.destination}
        />
        {predictions.length > 0 ? (
          <TouchableOpacity onPress={selectPlace}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styless.suggestions}>{predictions}</Text>
          </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styless = StyleSheet.create({
  suggestions: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 0.5
  }
});
