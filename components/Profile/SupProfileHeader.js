import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';


import styles from '../../constants/Profile/SupProfileHeader'

const SupProfileHeader = props => {
  let profile = props.profile;

  return (
    <ScrollView style={styles.pic}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Avatar
            size={61}
            rounded
            source={{
              uri: profile.profile_image
            }}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{profile.sup_name}</Text>
            <Text style={styles.userText}>{profile.location}</Text>
            <Text style={styles.userText}>@{profile.username}</Text>
          </View>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              onPress={async () => {
                profile.email &&
                profile.email !== null &&
                await Linking.openURL(`mailto:${profile.email}`);
              }}
            >
              <SvgUri
                fill='#3b3b3b'
                width='25'
                height='25'
                source={require('../../assets/icons/envelope.svg')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 0, padding: 0 }}
              onPress={async () =>
                profile.instagram &&
                profile.instagram !== null &&
                (await WebBrowser.openBrowserAsync(profile.instagram))
              }
            >
              <SvgUri
                fill='#3b3b3b'
                width='25'
                height='25'
                source={require('../../assets/icons/instagram.svg')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () =>
                profile.twitter &&
                profile.twitter !== null &&
                (await WebBrowser.openBrowserAsync(profile.twitter))
              }
            >
              <SvgUri
                fill='#3b3b3b'
                width='25'
                height='25'
                source={require('../../assets/icons/twitter.svg')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () =>
                profile.facebook &&
                profile.facebook !== null &&
                (await WebBrowser.openBrowserAsync(profile.facebook))
              }
            >
              <SvgUri
                fill='#3b3b3b'
                width='25'
                height='25'
                source={require('../../assets/icons/facebook.svg')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SupProfileHeader;
