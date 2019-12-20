import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';

import DetailHeader from '../components/DetailScreen/DetailHeader';
import DetailAboutUs from '../components/DetailScreen/DetailAboutUs';

import styles from '../constants/screens/MyDetailScreen';

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'Lato-Bold'
      },
      headerLeft: <View />,
      headerRight: <View />
    };
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollBG}>
        <DetailHeader
          navigation={this.props.navigation}
          profile={this.props.selectedProfile}
        />
        <DetailAboutUs
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

export default connect(mapStateToProps)(DetailsScreen);
