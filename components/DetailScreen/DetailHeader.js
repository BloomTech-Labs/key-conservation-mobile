import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { withNavigation } from 'react-navigation';

import { Avatar, SocialIcon, Icon } from 'react-native-elements';

class DetailHeader extends Component {
  render() {
    return (
      <View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => this.props.navigation.navigate('Pro')}
          >
            <View style={styles.LeftButtonStyle}>
              <Text style={styles.ButtonText}>Campaigns</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <View style={styles.RightButtonStyle}>
              <Text style={styles.DetailButton}>Details</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.header}>
            <Avatar
              size='large'
              rounded
              source={{
                uri:
                  'https://www.seewinter.com/wp-content/uploads/2018/09/poolboy-hatchling-100-1200-wide.jpg'
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Carribean Sea Turtle Project</Text>
              <Text style={styles.location}>St. George's, Grenada</Text>
              <Text>carribbeanseaturtleproject.com</Text>
              <View style={styles.SocialContainer}>
                <Icon
                  style={styles.SocialIcon}
                  name='facebook'
                  type='font-awesome'
                />
                <Icon
                  style={styles.SocialIcon}
                  name='twitter'
                  type='font-awesome'
                />
                <Icon
                  style={styles.SocialIcon}
                  name='instagram'
                  type='font-awesome'
                />
                <Icon
                  style={styles.SocialIcon}
                  name='phone'
                  type='font-awesome'
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: -10
  },
  title: {
    fontWeight: "400"
  },
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: 25,
    backgroundColor: '#fff',
    width: '100%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomColor: 'whitesmoke'
  },
  TouchableOpacity: {
    flex: 1
  },
  LeftButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 8,
    marginBottom: 8,
    flex: 1,
    borderRightWidth: 1
  },
  RightButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 8,
    marginBottom: 8,
    flex: 1,
    borderLeftWidth: 1
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
  },
  SocialContainer: {
    marginTop: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150
  },
  SocialIcon: {
    height: 40,
    width: 40
  }
});

export default withNavigation(DetailHeader);
