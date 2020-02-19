import React from 'react';

import Envelope from '../../assets/jsicons/socialmedia/Envelope';
import PhoneAdd from '../../assets/jsicons/socialmedia/PhoneAdd';
import Phone from '../../assets/jsicons/socialmedia/Phone';
import IgAdd from '../../assets/jsicons/socialmedia/IgAdd';
import Twitter from '../../assets/jsicons/socialmedia/Twitter';
import TwitterAdd from '../../assets/jsicons/socialmedia/TwitterAdd';
import Instagram from '../../assets/jsicons/socialmedia/Instagram';
import FbAdd from '../../assets/jsicons/socialmedia/FbAdd';
import Facebook from '../../assets/jsicons/socialmedia/Facebook';
import { View, TouchableOpacity, Linking } from 'react-native';

import styles from '../../constants/Profile/SocialContainer';

const SocialContainer = props => {
  const { profile } = props;

  const makeCall = () => {
    let phoneNumber = profile.phone_number;
    // let phoneNumber = 123456789 -- used for testing purposes
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.sections}>
      <View style={styles.sections}>
        <View style={styles.SocialContainer}>
          <TouchableOpacity
            onPress={async () => {
              profile.email &&
                profile.email !== null &&
                (await Linking.openURL(`mailto:${profile.email}`));
            }}
          >
            <Envelope />
          </TouchableOpacity>
          {profile.phone_number === null ? (
            props.myProfile === true ? (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={() => props.navigation.navigate('EditPro')}
              >
                <PhoneAdd />
              </TouchableOpacity>
            ) : null
          ) : (
            <TouchableOpacity
              style={{ padding: 0, padding: 0 }}
              onPress={makeCall}
            >
              <Phone />
            </TouchableOpacity>
          )}
          {profile.instagram === null ? (
            props.myProfile === true ? (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={() => props.navigation.navigate('EditPro')}
              >
                <IgAdd />
              </TouchableOpacity>
            ) : null
          ) : (
            <TouchableOpacity
              style={{ padding: 0, padding: 0 }}
              onPress={() => WebBrowser.openBrowserAsync(profile.instagram)}
            >
              <Instagram />
            </TouchableOpacity>
          )}
          {profile.twitter === null ? (
            props.myProfile === true ? (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={() => props.navigation.navigate('EditPro')}
              >
                <TwitterAdd />
              </TouchableOpacity>
            ) : null
          ) : (
            <TouchableOpacity
              onPress={() => WebBrowser.openBrowserAsync(profile.twitter)}
            >
              <Twitter />
            </TouchableOpacity>
          )}
          {profile.facebook === null ? (
            props.myProfile === true ? (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={() => props.navigation.navigate('EditPro')}
              >
                <FbAdd />
              </TouchableOpacity>
            ) : null
          ) : (
            <TouchableOpacity
              onPress={() => WebBrowser.openBrowserAsync(profile.facebook)}
            >
              <Facebook />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SocialContainer;
