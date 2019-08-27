import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import { AmpEvent } from '../withAmplitude';

import styles from '../../constants/DetailScreen/DetailHeader';

export default class DetailHeader extends Component {
  render() {
    let profile = this.props.profile;

    return (
      <View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.TouchableOpacity]}
            onPress={() =>
              this.props.navigation.navigate(
                this.props.myProfile ? 'MyPro' : 'Pro'
              )
            }
          >
            <View style={styles.ButtonStyle}>
              <Text style={styles.CampaignButton}>Campaigns</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.TouchableOpacity,
              null ? {} : { borderBottomColor: '#00FF9D', borderBottomWidth: 2 }
            ]}
          >
            <View style={styles.ButtonStyle}>
              <Text style={styles.DetailButton}>Details</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.avatarInfoWrap}>
            <View style={styles.header}>
              <Avatar
                size={61}
                rounded
                source={{
                  uri: profile.profile_image
                }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{profile.org_name}</Text>
                <Text style={styles.userText}>{profile.location}</Text>
                <Text
                  style={styles.userText}
                  onPress={async () => {
                    profile.org_link_url &&
                      profile.org_link_url !== null &&
                      (await AmpEvent('Website Link Clicked', {
                        orgName: profile.org_name
                      }));
                    await WebBrowser.openBrowserAsync(profile.org_link_url);
                  }}
                >
                  {profile.org_link_text}
                </Text>
              </View>
              <View style={styles.SocialContainer}>
                <TouchableOpacity
                  onPress={async () => {
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
        </View>
      </View>
    );
  }
}

