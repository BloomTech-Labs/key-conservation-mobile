import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import DetailHeader from '../components/DetailScreen/DetailHeader';
import DetailAboutUs from '../components/DetailScreen/DetailAboutUs';

import EditButton from '../components/EditButton';

class MyDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Details',
      headerLeft: null,
      headerRight: <EditButton navigation={navigation} editRoute={'EditDetail'} />
    };
  }

  componentDidMount() {
    this.props.getProfileData(this.props.currentUser.id, false, 'myProfile');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: '#F2F2FB' }}>
        <DetailHeader
          navigation={this.props.navigation}
          myProfile={true}
          profile={this.props.currentUser.profile}
        />
        <DetailAboutUs
          navigation={this.props.navigation}
          myProfile={true}
          profile={this.props.currentUser.profile}
        />
      </ScrollView>
    );
  };
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
)(MyDetailsScreen);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingTop: 50,

    flexWrap: 'wrap'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomColor: 'whitesmoke'
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 35
  },
  ButtonText: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  DetailButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'blue'
  }
});
