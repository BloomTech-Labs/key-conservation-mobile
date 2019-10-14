import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { ScrollView } from "react-navigation";
import * as WebBrowser from "expo-web-browser";
import { Avatar } from "react-native-elements";
import { AmpEvent } from "../withAmplitude";
import { FontAwesome } from "@expo/vector-icons";

import styles from "../../constants/Profile/ProfileHeader";

const ProfileHeader = props => {
  let profile = props.profile;

  const WebsiteClick = async () => {
    if (profile.org_link_url && profile.org_link_url !== null) {
      (await WebBrowser.openBrowserAsync(profile.org_link_url)) &&
        AmpEvent("Website Link Clicked", { orgName: profile.org_name });
    }
  };

  return (
    <ScrollView style={styles.pic}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.TouchableOpacity,
            null ? {} : { borderBottomColor: "#00FF9D", borderBottomWidth: 2 }
          ]}
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.CampaignButton}>Campaigns</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => {
            props.navigation.navigate(props.myProfile ? "MyDetail" : "Detail");
          }}
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.DetailButton}>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
      {profile.org_name === null ? (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={61}
            rounded
            source={{
              uri: profile.profile_image
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.org}>{profile.org_name}</Text>
          <Text style={styles.locationText}>
            <FontAwesome name='map-pin' style={styles.outline} />{" "}
            {profile.location}
          </Text>
          <Text style={styles.websiteText} onPress={WebsiteClick}>
            {profile.org_link_text}
          </Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>{profile.mini_bio}</Text>
        </View>
      </View>
      )} :
      <ImageBackground
        source={require("../../assets/images/whaleshark.png")}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000"
        }}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Avatar
              size={61}
              rounded
              source={{
                uri: profile.profile_image
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.org}>{profile.org_name}</Text>
            <Text style={styles.locationText}>
              <FontAwesome name='map-pin' style={styles.outline} />{" "}
              {profile.location}
            </Text>
            <Text style={styles.websiteText} onPress={WebsiteClick}>
              {profile.org_link_text}
            </Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{profile.mini_bio}</Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ProfileHeader;
