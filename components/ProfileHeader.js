import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Platform
} from 'react-native';

import { withNavigation } from 'react-navigation';

import { Avatar, Icon } from 'react-native-elements';

class ProfileHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.pic}>
        <View style={styles.container}>
          <Avatar
            size='large'
            rounded
            source={{
              uri:
                'https://www.seewinter.com/wp-content/uploads/2018/09/poolboy-hatchling-100-1200-wide.jpg'
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.org}>Carribean Sea Turtle Project</Text>
            <Text style={styles.location}>St. George's, Grenada</Text>
            <Text style={styles.social}>@CarribeanSeaTurtleProject</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={{ textAlign: 'left', width: 300 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nemo
              voluptatibus minima neque esse reiciendis rem!
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={{ paddingTop: 25, paddingBottom: 25, width: 250 }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  height: 35
                }}
              >
                <Text
                  style={{
                    color: 'black',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 2
                  }}
                >
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <View style={styles.LeftButtonStyle}>
              <Text style={styles.CampaignButton}>Campaigns</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => this.props.navigation.navigate('Detail')}
          >
            <View style={styles.RightButtonStyle}>
              <Text style={styles.DetailButton}>Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    paddingTop: 50,

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
    borderBottomColor: 'whitesmoke',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2
  },
  TouchableOpacity: {
    flex: 1
  },
  LeftButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1,
    borderRightWidth: 1
  },
  RightButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1,
    borderLeftWidth: 1
  },
  CampaignButton: {
    fontSize: 18,
    color: 'blue'
  },
  DetailButton: {
    fontSize: 18,
    color: 'black'
  }
});

export default withNavigation(ProfileHeader);
