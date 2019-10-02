import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import moment from "moment";
import { Avatar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { AmpEvent } from "../withAmplitude";
import {
  getProfileData,
  getCampaign,
  toggleCampaignText
} from "../../store/actions";

import styles from "../../constants/FeedScreen/FeedCampaign";
import styles2 from "../../constants/Comments/Comments";

const FeedCampaign = props => {
  const dispatch = useDispatch();
  const { data, toggled } = props;
  const shorten = (string, cutoff) => {
    if (string.length < cutoff) {
      return string;
    } else {
      let end = cutoff;
      const avoidChars = [" ", ",", ".", "!"];
      while (avoidChars.includes(string.charAt(end)) && end >= cutoff - 10) {
        end--;
      }
      return `${string.substring(0, end)}...`;
    }
  };

  const createdAt = data.created_at;
  const currentTime = moment();
  const postTime = moment(createdAt);
  let timeDiff;
  if (currentTime.diff(postTime, "days") < 1) {
    if (currentTime.diff(postTime, "hours") < 1) {
      if (currentTime.diff(postTime, "minutes") < 1) {
        timeDiff = "just now";
      } else {
        if (currentTime.diff(postTime, "minutes") === 1) {
          timeDiff = `${currentTime.diff(postTime, "minutes")} MINUTE AGO`;
        } else {
          timeDiff = `${currentTime.diff(postTime, "minutes")} MINUTES AGO`;
        }
      }
    } else {
      if (currentTime.diff(postTime, "hours") === 1) {
        timeDiff = `${currentTime.diff(postTime, "hours")} HOUR AGO`;
      } else {
        timeDiff = `${currentTime.diff(postTime, "hours")} HOURS AGO`;
      }
    }
  } else {
    if (currentTime.diff(postTime, "days") === 1) {
      timeDiff = `${currentTime.diff(postTime, "days")} DAY AGO`;
    } else {
      timeDiff = `${currentTime.diff(postTime, "days")} DAYS AGO`;
    }
  }

  const goToProfile = async () => {
    await dispatch(getProfileData(data.users_id));
    AmpEvent("Select Profile from Campaign", {
      profile: data.username,
      campaign: data.camp_name
    });
    props.navigation.navigate("Pro");
  };

  const goToCampaign = async () => {
    await dispatch(getCampaign(data.camp_id));
    AmpEvent("Select Profile from Campaign", {
      campaign: data.camp_name,
      profile: data.username
    });
    props.navigation.navigate("Camp");
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(data.camp_id));
  };

  return (
    <View style={styles.container}>
      <ListItem
        onPress={goToProfile}
        title={
          <View>
            <Text style={styles.orgTitleView}>{data.username}</Text>
          </View>
        }
        leftAvatar={{ source: { uri: data.profile_image } }}
        subtitle={data.location}
      />
      <View>
        {/* <TouchableOpacity activeOpacity={0.5} onPress={goToCampaign}>
          <Image
            source={{ uri: data.camp_img }}
            style={styles.campImgContain}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.goToCampaignButton}
        onPress={goToCampaign}
      >
        <Text style={styles.goToCampaignText}>See Post {'>'}</Text>
      </TouchableOpacity> */}

        <TouchableOpacity activeOpacity={0.5} onPress={goToCampaign}>
          <ImageBackground
            source={{ uri: data.camp_img }}
            style={styles.campImgContain}
          >
            <View style={styles.goToCampaignButton} onPress={goToCampaign}>
              <Text style={styles.goToCampaignText}>See Update {">"}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.campDesc}>
        <Text style={styles.campDescName}>{data.camp_name}</Text>
        {toggled || data.camp_desc.length < 80 ? (
          <Text style={styles.campDescText}>{data.camp_desc}</Text>
        ) : (
          <Text style={styles.campDescText}>
            {shorten(data.camp_desc, 80)}
            &nbsp;
            <Text onPress={toggleText} style={styles.readMore}>
              Read More
            </Text>
          </Text>
        )}
      </View>
      <View style={{ marginLeft: 17 }}>
        <FlatList
          data={data.comments.slice(0, 2)}
          keyExtractor={comment => comment.comment_id}
          renderItem={({ item }) => {
            return (
              <View style={styles2.commentWrapper}>
                <View style={styles2.commentView}>
                  <View style={styles2.avatar}>
                    <Avatar
                      rounded
                      source={{
                        uri: item.profile_image
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles2.username}>{item.username}</Text>
                    <Text style={styles2.commentBody}>{item.comment_body}</Text>
                  </View>
                </View>
                <View style={styles2.interaction}>
                  <Text style={styles2.timeText}>{timeDiff}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View>
        {data.comments.length >= 1 ? (
          data.comments.length === 1 ? (
            <Text style={styles.comments} onPress={goToCampaign}>
              View {data.comments.length} comment
            </Text>
          ) : (
            <Text style={styles.comments} onPress={goToCampaign}>
              View all {data.comments.length} comments
            </Text>
          )
        ) : null}
      </View>
      <Text style={styles.timeText}>{timeDiff}</Text>
      <View style={styles.demarcation}></View>
    </View>
  );
};

export default FeedCampaign;
