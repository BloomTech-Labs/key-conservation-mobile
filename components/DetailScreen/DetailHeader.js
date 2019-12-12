import React, { Component } from "react";
import { Text, View, TouchableOpacity, Linking, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Avatar } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import { AmpEvent } from "../withAmplitude";

import styles from "../../constants/DetailScreen/DetailHeader";

export default class DetailHeader extends Component {
  makeCall = () => { 
    let phoneNumber = this.props.profile.phone_number;
    // let phoneNumber = 123456789 -- used for testing purposes
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };
  render() {
    let profile = this.props.profile;

    return (
      <View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.TouchableOpacity]}
            onPress={() =>
              this.props.navigation.navigate(
                this.props.myProfile ? "MyPro" : "Pro"
              )
            }
          >
            <View style={styles.ButtonStyle}>
              <Text style={styles.CampaignButton}>Campaigns</Text>
            </View>
          </TouchableOpacity>
          {!this.props.myProfile ? (
            <TouchableOpacity
              style={[styles.TouchableOpacity]}
              onPress={() => this.props.navigation.navigate("Location")}
            >
              <View style={styles.ButtonStyle}>
                <Text style={styles.CampaignButton}>Location</Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={[
              styles.TouchableOpacity,
              null ? {} : { borderBottomColor: "#00FF9D", borderBottomWidth: 2 }
            ]}
          >
            <View style={styles.ButtonStyle}>
              <Text style={styles.DetailButton}>Details</Text>
            </View>
          </TouchableOpacity>
        </View>
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
              <Text style={styles.titleText}>{profile.org_name}</Text>
              <Text style={styles.userText}>{profile.location}</Text>
              <Text
                style={styles.urlText}
                onPress={async () => {
                  profile.org_link_url &&
                    profile.org_link_url !== null &&
                    (await AmpEvent("Website Link Clicked", {
                      orgName: profile.org_name
                    }));
                  await WebBrowser.openBrowserAsync(profile.org_link_url);
                }}
              >
                {profile.org_link_text}
              </Text>
            </View>
          </View>
          <View style={styles.SocialContainer}>
            <TouchableOpacity
              onPress={async () => {
                profile.email &&
                  profile.email !== null &&
                  (await Linking.openURL(`mailto:${profile.email}`));
              }}
            >
              <SvgUri
                fill="#3b3b3b"
                width="31"
                height="31"
                source={require("../../assets/icons/envelope.svg")}
              />
            </TouchableOpacity>
            {profile.phone_number === null ? (
              this.props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => this.props.navigation.navigate("EditPro")}
                >
                  <SvgUri
                    width="31"
                    height="31"
                    source={require("../../assets/icons/phoneadd.svg")}
                  />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={this.makeCall}
              >
                <SvgUri
                  fill="#3b3b3b"
                  width="31"
                  height="31"
                  source={require("../../assets/icons/phone.svg")}
                />
              </TouchableOpacity>
            )}
            {profile.instagram === null ? (
              this.props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => this.props.navigation.navigate("EditPro")}
                >
                  <SvgUri
                    width="31"
                    height="31"
                    source={require("../../assets/icons/igadd.svg")}
                  />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={() => WebBrowser.openBrowserAsync(profile.instagram)}
              >
                <SvgUri
                  fill="#3b3b3b"
                  width="31"
                  height="31"
                  source={require("../../assets/icons/instagram.svg")}
                />
              </TouchableOpacity>
            )}
            {profile.twitter === null ? (
              this.props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => this.props.navigation.navigate("EditPro")}
                >
                  <SvgUri
                    width="31"
                    height="31"
                    source={require("../../assets/icons/twittadd.svg")}
                  />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                onPress={() => WebBrowser.openBrowserAsync(profile.twitter)}
              >
                <SvgUri
                  fill="#3b3b3b"
                  width="31"
                  height="31"
                  source={require("../../assets/icons/twitter.svg")}
                />
              </TouchableOpacity>
            )}
            {profile.facebook === null ? (
              this.props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => this.props.navigation.navigate("EditPro")}
                >
                  <SvgUri
                    width="31"
                    height="31"
                    source={require("../../assets/icons/fbadd.svg")}
                  />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                onPress={() => WebBrowser.openBrowserAsync(profile.facebook)}
              >
                <SvgUri
                  fill="#3b3b3b"
                  width="31"
                  height="31"
                  source={require("../../assets/icons/facebook.svg")}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}
