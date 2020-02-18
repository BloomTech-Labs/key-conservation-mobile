import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground
} from 'react-native';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { Avatar } from 'react-native-elements';
import styles from '../../constants/Profile/SupProfileHeader';
import traschCan from '../../constants/DetailScreen/DetailHeader';
//icons
import Envelope from '../../assets/jsicons/socialmedia/Envelope';
import Instagram from '../../assets/jsicons/socialmedia/Instagram';
import Twitter from '../../assets/jsicons/socialmedia/Twitter';
import Facebook from '../../assets/jsicons/socialmedia/Facebook';
import { randomImage } from '../Animals/RandomImage';
import MapMarker from '../../assets/jsicons/headerIcons/map-marker';

const SupProfileHeader = props => {
  let profile = props.profile;
  const randomHeaderImage = randomImage();
  return (
    <ImageBackground
      source={randomHeaderImage}
      style={{
        backgroundColor: '#000',
        height: 260,
        paddingTop: 100
      }}
      imageStyle={{ opacity: 0.7 }}
    >
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
            <View style={traschCan.nameContainer}>
              <Text style={styles.titleText}>
                {props.loading ? 'Loading...' : profile.sup_name}
              </Text>
            </View>
            {props.loading ? null : (
              <View>
                <Text style={styles.userText}>
                  <MapMarker />
                  {profile.location}
                </Text>
                <Text style={styles.userText}>@{profile.username}</Text>
              </View>
            )}
          </View>
          {props.loading ? null : (
            <View style={styles.socialContainer}>
              <TouchableOpacity
                onPress={async () => {
                  profile.email &&
                    profile.email !== null &&
                    (await Linking.openURL(`mailto:${profile.email}`));
                }}
              >
                <Envelope />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={async () =>
                  profile.instagram &&
                  profile.instagram !== null &&
                  (await WebBrowser.openBrowserAsync(profile.instagram))
                }
              >
                <Instagram />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () =>
                  profile.twitter &&
                  profile.twitter !== null &&
                  (await WebBrowser.openBrowserAsync(profile.twitter))
                }
              >
                <Twitter />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () =>
                  profile.facebook &&
                  profile.facebook !== null &&
                  (await WebBrowser.openBrowserAsync(profile.facebook))
                }
              >
                <Facebook />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {/* <View style={styles.buttons}>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <View style={styles.ButtonStyle}>
              <Text style={styles.DetailButton}>Details</Text>
            </View>
          </TouchableOpacity>
        </View> */}
    </ImageBackground>
  );
};

export default SupProfileHeader;
