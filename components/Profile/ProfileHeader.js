import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import { AmpEvent } from '../withAmplitude';

import styles from '../../constants/Profile/ProfileHeader';

const ProfileHeader = props => {
  let profile = props.profile;

  return (
    <ScrollView style={styles.pic}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.TouchableOpacity,
            null ? {} : { borderBottomColor: '#00FF9D', borderBottomWidth: 2 }
          ]}
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.CampaignButton}>Campaigns</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => {
            props.navigation.navigate(props.myProfile ? 'MyDetail' : 'Detail');
          }}
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.DetailButton}>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Avatar
          size='large'
          rounded
          source={{
            uri: profile.profile_image
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.org}>{profile.org_name}</Text>
          <Text style={styles.location}>{profile.location}</Text>
          <Text
            onPress={async () => {
              profile.org_link_url &&
                profile.org_link_url !== null &&
                AmpEvent('Website Link Clicked', { orgName: profile.org_name });
              await WebBrowser.openBrowserAsync(profile.org_link_url);
            }}
          >
            {profile.org_link_text}
          </Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={{ textAlign: 'left', width: 300 }}>
            {profile.mini_bio}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileHeader;
