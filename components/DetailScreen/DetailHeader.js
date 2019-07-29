import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';

import { Avatar, SocialIcon, Icon } from 'react-native-elements';

const DetailHeader = props => {
  let profile = props.profile;

  return (
    <View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() =>
            props.navigation.navigate(props.myProfile ? 'MyPro' : 'Pro')
          }
        >
          <View style={[styles.ButtonStyle, styles.LeftButtonStyle]}>
            <Text style={styles.CampaignButton}>Campaigns</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity}>
          <View style={[styles.ButtonStyle, styles.RightButtonStyle]}>
            <Text style={styles.DetailButton}>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar
            size='large'
            rounded
            source={{
              uri: profile.profile_image
            }}
          />
          <View style={styles.textContainer}>
            <View style={styles.titleLocationWrap}>
              <Text style={styles.title}>{profile.org_name}</Text>
              <Text style={styles.location}>{profile.location}</Text>
            </View>
            <Text>{profile.email}</Text>
            <View style={styles.SocialContainer}>
              <Icon
                style={styles.SocialIcon}
                name='facebook'
                type='font-awesome'
              />
              <Icon
                style={styles.SocialIcon}
                name='twitter'
                type='font-awesome'
              />
              <Icon
                style={styles.SocialIcon}
                name='instagram'
                type='font-awesome'
              />
              <Icon
                style={styles.SocialIcon}
                name='phone'
                type='font-awesome'
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: -10
  },
  title: {
    fontWeight: '600'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: 25,
    backgroundColor: '#fff',
    width: '100%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomColor: 'whitesmoke'
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
    color: 'black'
  },
  DetailButton: {
    fontSize: 18,
    color: 'blue'
  },
  SocialContainer: {
    marginTop: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150
  },
  SocialIcon: {
    height: 40,
    width: 40
  },
  titleLocationWrap: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 2,
    paddingBottom: 10
  }
});

export default DetailHeader;
