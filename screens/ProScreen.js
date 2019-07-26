import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import { Avatar, Icon, ListItem } from 'react-native-elements';

import ProfileHeader from '../components/Profile/ProfileHeader';

export default class ProScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const list = [
      {
        title: 'preserveppointments',
        icon: 'https://cdn140.picsart.com/298473866319201.png?c256x256'
      },
      {
        title: 'save them Trips',
        icon:
          'https://pbs.twimg.com/profile_images/673973639679635456/8B4uFcXq_400x400.jpg'
      },
      {
        title: 'Help the pandas',
        icon: 'https://cdn140.picsart.com/298473866319201.png?c256x256'
      },
      {
        title: 'Help them birds',
        icon:
          'https://pbs.twimg.com/profile_images/673973639679635456/8B4uFcXq_400x400.jpg'
      },
      ,
      {
        title: 'Help them lions',
        icon: 'https://cdn140.picsart.com/298473866319201.png?c256x256'
      },
      {
        title: 'save them tigers bruh',
        icon:
          'https://pbs.twimg.com/profile_images/673973639679635456/8B4uFcXq_400x400.jpg'
      }
    ];

    return (
      <ScrollView>
        <ProfileHeader />
        <View />
        <View style={{ backgroundColor: 'white' }}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftAvatar={{ source: { uri: item.icon } }}
              subtitle='We saving them animals'
              rightIcon={
                <Icon name='ellipsis-v' type='font-awesome' color='black' />
              }
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

ProScreen.navigationOptions = {
  title: 'Profile'
};
