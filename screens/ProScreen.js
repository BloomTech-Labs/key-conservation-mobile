import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import { Avatar, Icon } from 'react-native-elements';

import ProfileHeader from '../components/ProfileHeader';

export default class ProScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.pic}>
        <View style={styles.container}>
          <ProfileHeader />
        </View>
        <View>
          <View style={styles.buttons}>
            <Button title='Campaigns' />

            <Button
              onPress={() => this.props.navigation.navigate('Detail')}
              title='Details'
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

ProScreen.navigationOptions = {
  title: 'Profile'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    backgroundColor: '#eee',
    paddingTop: 50,
    paddingBottom: 50,
    flexWrap: 'wrap'
  },
  bioContainer: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 90,
    marginRight: 60,
    textAlign: 'center',
    alignItems: 'center'
  },
  bio: {
    marginBottom: 50
  },
  org: {
    fontSize: 22
  },
  pic: {
    flex: 1
  },
  textContainer: {},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 3,
    borderBottomColor: 'whitesmoke'
  }
});
