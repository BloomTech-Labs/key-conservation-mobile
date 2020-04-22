import React, { useMemo, useState, forwardRef } from 'react';
import { View, Text, TouchableOpacity, Linking, Animated } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import { AmpEvent } from '../withAmplitude';
import animalData from '../../components/Animals/animalData';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactHeader';
import MapMarker from '../../assets/jsicons/headerIcons/map-marker';
import { randomImage } from '../Animals/RandomImage';
import ConnectionsHeader from '../Connections/ConnectionsHeader';

import { useHeaderHeight } from 'react-navigation-stack';

const OrgSkilledImpactHeader = forwardRef((props, ref) => {

  let headerImage = animalData[3].image;



  const handleLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;

    setState({
      ...state,
      MAX_HEADER_HEIGHT: height
    });
  };


  return (
    <Animated.View
      style={styles.container}
    >
      <Animated.Image
        source={headerImage}
        resizeMode="cover"
        style={styles.headerImageContainer}
      />
      <Animated.View
        style={[
          styles.headerTitleContainer
        ]}
      >
        <View style={styles.avatarContainer}>
          <View
            style={styles.CircleShapeView}
          >
            <Text style={styles.headerTitle}>USE YOUR SKILLS FOR GOOD</Text>
          </View>
        </View>
      </Animated.View>

      {/*<Animated.View*/}
      {/*  style={[*/}
      {/*    styles.contentContainer,*/}
      {/*    { marginTop: appHeaderHeight, opacity: contentOpacity }*/}
      {/*  ]}*/}
      {/*>*/}
      {/*  <View style={styles.avatarContainer}>*/}
      {/*    <Avatar*/}
      {/*      size={80}*/}
      {/*      rounded*/}
      {/*      source={{*/}
      {/*        uri: profile.profile_image || undefined*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </View>*/}

      {/*  <View style={styles.textContainer}>*/}
      {/*    <Text style={styles.org}>{profileName}</Text>*/}
      {/*    {props.loading ? null : (*/}
      {/*      <View>*/}
      {/*        {!profile.location ? null : (*/}
      {/*          <Text style={styles.locationText}>*/}
      {/*            <MapMarker /> {profile.location}*/}
      {/*          </Text>*/}
      {/*        )}*/}
      {/*        {profile.link_url || profile.link_url !== '' ? (*/}
      {/*          profile.link_text || profile.link_text !== '' ? (*/}
      {/*            <Text style={styles.websiteText} onPress={WebsiteClick}>*/}
      {/*              {profile.link_text}*/}
      {/*            </Text>*/}
      {/*          ) : (*/}
      {/*            <Text style={styles.websiteText} onPress={WebsiteClick}>*/}
      {/*              {profile.link_url}*/}
      {/*            </Text>*/}
      {/*          )*/}
      {/*        ) : null}*/}
      {/*      </View>*/}
      {/*    )}*/}
      {/*  </View>*/}

      {/*  <View style={styles.bioContainer}>*/}
      {/*    <Text style={styles.bioText}>{profile.mini_bio}</Text>*/}
      {/*  </View>*/}

      {/*  <ConnectionsHeader*/}
      {/*    profileId={props.profileId}*/}
      {/*    profileData={props.profile}*/}
      {/*  />*/}
      {/*</Animated.View>*/}
    </Animated.View>
  );
});

export default OrgSkilledImpactHeader;
