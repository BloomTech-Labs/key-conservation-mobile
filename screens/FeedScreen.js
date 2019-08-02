import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStorage from "expo-secure-store";

import { getCampaigns } from "../store/actions";

import { Icon } from "react-native-elements";

import Campaign from "../components/FeedScreen/Campaign";

import styles from "../constants/Stylesheet";

function FeedScreen(props) {
  let { allCampaigns } = useSelector(state => state);
  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  return (
    <ScrollView>
      <Button
        title="LOGOUT"
        onPress={async () => {
          await SecureStorage.deleteItemAsync("sub", {});
          props.navigation.navigate("Loading");
        }}
      />
      <View style={styles.feedContainer}>
        {allCampaigns.length > 0 &&
          allCampaigns.map(campaign => {
            return (
              <Campaign
                key={campaign.camp_id}
                data={campaign}
                navigation={navigation}
              />
            );
          })}
      </View>
    </ScrollView>
  );
}

FeedScreen.navigationOptions = {
  title: "Feed",
  headerRight: <Icon name="search" type="font-awesome" /> // Find out how to implement this better// And how to style this!
};

export default FeedScreen;
