import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';

import LocationHeader from '../components/Location/LocationHeader';
import LocationMap from '../components/Location/LocationMap';
import BackButton from '../components/BackButton';

class LocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => <View />
    };
  };

  render() {
    return (
      <ScrollView>
        <LocationHeader
          navigation={this.props.navigation}
          profile={this.props.selectedProfile}
        />
        <LocationMap
          navigation={this.props.navigation}
          profile={this.props.selectedProfile}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile
});

export default connect(mapStateToProps)(LocationScreen);
