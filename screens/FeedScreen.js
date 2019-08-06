import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import { getCampaigns, logoutSuccess, logoutStart } from "../store/actions";

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
          dispatch(logoutStart());
          await SecureStore.deleteItemAsync("sub", {});
          await SecureStore.deleteItemAsync("email", {});
          await SecureStore.deleteItemAsync("roles", {});
          await SecureStore.deleteItemAsync("userId", {});
          dispatch(logoutSuccess());
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
