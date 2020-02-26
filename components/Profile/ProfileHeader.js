import React, { useMemo } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import { AmpEvent } from '../withAmplitude';

import styles from '../../constants/Profile/ProfileHeader';
import MapMarker from '../../assets/jsicons/headerIcons/map-marker';
import { randomImage } from '../Animals/RandomImage';
import ConnectionsHeader from '../Connections/ConnectionsHeader';

// Social Media Icons
import Envelope from '../../assets/jsicons/socialmedia/Envelope';
import Instagram from '../../assets/jsicons/socialmedia/Instagram';
import Twitter from '../../assets/jsicons/socialmedia/Twitter';
import Facebook from '../../assets/jsicons/socialmedia/Facebook';

const ProfileHeader = props => {
  let profile = props.profile || {};

  let randomHeaderImage = useMemo(() => randomImage(), []);

  const WebsiteClick = async () => {
    if (profile.org_link_url && profile.org_link_url !== null) {
      (await WebBrowser.openBrowserAsync(profile.org_link_url)) &&
        AmpEvent('Website Link Clicked', { orgName: profile.org_name });
    }
  };

  return (
    <ImageBackground
      source={randomHeaderImage}
      resizeMode='cover'
      style={{
        paddingTop: 86,
        backgroundColor: '#000000'
      }}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={70}
            rounded
            source={{
              uri: profile.profile_image
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.org}>
            {props.loading
              ? 'Loading...'
              : profile.sup_name || profile.username || profile.org_name}
          </Text>
          {props.loading ? null : (
            <View>
              {!profile.location ? null : (
                <Text style={styles.locationText}>
                  <MapMarker /> {profile.location}
                </Text>
              )}
              {profile.org_link_url || profile.org_link_url !== '' ? (
                profile.org_link_text || profile.org_link_text !== '' ? (
                  <Text style={styles.websiteText} onPress={WebsiteClick}>
                    {profile.org_link_text}
                  </Text>
                ) : (
                  <Text style={styles.websiteText} onPress={WebsiteClick}>
                    {profile.org_link_url}
                  </Text>
                )
              ) : null}
              {props.loading || profile.roles !== 'supporter' ? null : (
                <View>
                  <Text style={styles.userText}>@{profile.username}</Text>
                </View>
              )}
              {profile.roles === 'supporter' ? (
                <View style={styles.socialContainer}>
                  {!profile.email ? null : (
                    <TouchableOpacity
                      style={styles.socialIcon}
                      onPress={async () => {
                        await Linking.openURL(`mailto:${profile.email}`);
                      }}
                    >
                      <Envelope />
                    </TouchableOpacity>
                  )}
                  {!profile.instagram ? null : (
                    <TouchableOpacity
                      style={styles.socialIcon}
                      onPress={async () =>
                        await WebBrowser.openBrowserAsync(profile.instagram)
                      }
                    >
                      <Instagram />
                    </TouchableOpacity>
                  )}
                  {!profile.twitter ? null : (
                    <TouchableOpacity
                      style={styles.socialIcon}
                      onPress={async () =>
                        await WebBrowser.openBrowserAsync(profile.twitter)
                      }
                    >
                      <Twitter />
                    </TouchableOpacity>
                  )}
                  {!profile.facebook ? null : (
                    <TouchableOpacity
                      style={styles.socialIcon}
                      onPress={async () =>
                        await WebBrowser.openBrowserAsync(profile.facebook)
                      }
                    >
                      <Facebook />
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View style={styles.bioContainer}>
                  <Text style={styles.bio}>{profile.mini_bio}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        <ConnectionsHeader
          profileId={props.profileId}
          profileData={props.profile}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileHeader;
