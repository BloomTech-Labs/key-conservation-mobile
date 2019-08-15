import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
<<<<<<< HEAD
  Platform,
  Linking
=======
  Platform
>>>>>>> parent of efea1c3... Revert "Merge branch 'single-campaign' into development"
} from 'react-native';
import { ScrollView } from "react-navigation";
import * as WebBrowser from 'expo-web-browser';
import { Avatar, Icon } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

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
                await Linking.openURL(`mailto:${profile.email}`);
            }}
            >
              <SvgUri
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

const styles = StyleSheet.create({
  container: {
    height: 163,
    flexDirection: 'row',
    // marginBottom: 37,
    // borderBottomWidth: 2,
    // borderBottomColor: '#eee',
  },
  rightContainer: {
    paddingTop: 29,
    flex: 1,
  },
  leftContainer: {
    paddingTop: 29,
    flex: 0,
    width: '30%',
    alignItems: 'center',
  },
  textContainer: {
    paddingTop: 2,
    height: 61,
    
  },
  titleText: {
    lineHeight: 22,
    fontSize: 16, 
    fontFamily: 'OpenSans-SemiBold'
  },
  userText: {
    lineHeight: 19,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular'
  },
  socialContainer: {
    flexDirection: 'row',
    width: 175,
    marginTop: 10,
    marginLeft: 3,
    justifyContent: 'space-between'
  },
  
});

export default SupProfileHeader;