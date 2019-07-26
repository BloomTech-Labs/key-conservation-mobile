import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import { getCampaigns } from "../store/actions"

export default function FeedScreen() {
  const { allCampaigns } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns())
  }, [])

  return (
    <ScrollView style={styles.container}>
      {state.campaigns.map(campaign => {
          return <Campaign />
            <Text>{campaign.name}</Text>
            <Text>{campaign.org}</Text>
            <Button
              title="SEE MORE FROM THIS ORG"
              onPress={() =>
                navigation.navigate('ProfileCampaigns', {
                  orgId: campaign.orgId,
                })}
            />
          </View>
        })}
    </ScrollView>
  );
}

FeedScreen.navigationOptions = {
  title: 'Feed'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
