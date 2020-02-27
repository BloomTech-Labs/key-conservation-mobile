import React, {
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Animated
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

import { useHeaderHeight } from 'react-navigation-stack';

const ProfileHeader = forwardRef((props, ref) => {
  let profile = props.profile || {};

  const appHeaderHeight = useHeaderHeight();

  const [state, setState] = useState({
    scrollY: new Animated.Value(0)
  });

  let randomHeaderImage = useMemo(() => randomImage(), []);

  const WebsiteClick = async () => {
    if (profile.org_link_url && profile.org_link_url !== null) {
      (await WebBrowser.openBrowserAsync(profile.org_link_url)) &&
        AmpEvent('Website Link Clicked', { orgName: profile.org_name });
    }
  };

  const handleLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;

    props.onLayout(height, appHeaderHeight);

    setState({
      ...state,
      MAX_HEADER_HEIGHT: height
    });
  };

  useImperativeHandle(ref, () =>
    Animated.event([{ nativeEvent: { contentOffset: { y: state.scrollY } } }])
  );

  // const scrollY = new Animated.Value(props.parentScrollY);

  const inputMax =
    state.MAX_HEADER_HEIGHT && state.MAX_HEADER_HEIGHT - appHeaderHeight;

  const translateY = state.MAX_HEADER_HEIGHT
    ? props.parentScrollY.interpolate({
        inputRange: [0, inputMax],
        outputRange: [0, -inputMax],
        extrapolate: 'clamp',
      })
    : 0;

  const headerBlur = state.MAX_HEADER_HEIGHT
    ? props.parentScrollY.interpolate({
        inputRange: [0, inputMax / 2, inputMax],
        outputRange: [0, 2, 10],
        extrapolate: 'clamp',
      })
    : 0;

  const contentOpacity = state.MAX_HEADER_HEIGHT
    ? props.parentScrollY.interpolate({
        inputRange: [0, inputMax / 2, inputMax],
        outputRange: [1, 0.2, 0],
        extrapolate: 'clamp'
      })
    : null;

  const profileName = props.loading
    ? 'Loading...'
    : profile.sup_name || profile.username || profile.org_name;
  return (
    <Animated.View style={[styles.container, { transform: [{translateY: translateY}] }]}>
      <Animated.Image
        source={randomHeaderImage}
        resizeMode='cover'
        style={{
          opacity: 0.6,
          height: 360,
          width: '100%',
        }}
        blurRadius={headerBlur}
        imageStyle={{ opacity: 0.6 }}
        onLayout={handleLayout}
      />
      <Animated.View
        style={[
          styles.headerTitleContainer,
          {
            opacity:
              contentOpacity?.interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [1, .6, 0]
              }) || 0
          }
        ]}
      >
        <Text style={styles.headerTitle}>{profileName}</Text>
      </Animated.View>
      <Animated.View
        style={[styles.contentContainer, { marginTop: appHeaderHeight,opacity: contentOpacity }]}
      >
        <View style={styles.avatarContainer}>
          <Avatar
            size={70}
            rounded
            source={{
              uri: profile.profile_image || undefined
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.org}>{profileName}</Text>
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
      </Animated.View>
    </Animated.View>
  );
});

export default ProfileHeader;
