import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../constants/FeedScreen/AddCampaignHeader';
import { Avatar } from 'react-native-elements';
import PlusLightening from '../../assets/jsicons/headerIcons/plusLightening';
import { withNavigation } from 'react-navigation';

const AddCampaignHeader = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => {
        props.navigation.navigate('CreateCampaign');
      }}
    >
      <View style={styles.avatarContainer}>
        <Avatar
          size={48}
          rounded
          source={{
            uri: props.profile.profile_image
          }}
        />
      </View>
      <Text style={styles.text}>Add New Campaign</Text>
      <View style={styles.plusLightening}>
        <View>
          <PlusLightening />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(AddCampaignHeader);
