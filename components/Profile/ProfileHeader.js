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

import { Avatar, Icon } from 'react-native-elements';

const ProfileHeader = props => {
  let profile = props.profile;

  return (
    <ScrollView style={styles.pic}>
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
          <Text style={styles.social}>{profile.email}</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={{ textAlign: 'left', width: 300 }}>
            {profile.mini_bio}
          </Text>
        </View>

        {props.myProfile && (
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
        )}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.TouchableOpacity}>
          <View style={[styles.ButtonStyle, styles.LeftButtonStyle]}>
            <Text style={styles.CampaignButton}>Campaigns</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() =>
            props.navigation.navigate(props.myProfile ? 'MyDetail' : 'Detail')
          }
        >
          <View style={[styles.ButtonStyle, styles.RightButtonStyle]}>
            <Text style={styles.DetailButton}>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },
  LeftButtonStyle: {
    borderRightWidth: 1
  },
  RightButtonStyle: {
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

export default ProfileHeader;
