import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../constants/FeedScreen/AddCampaignHeader';
import { Avatar } from 'react-native-elements';
import PlusLightening from '../../assets/js icons/headerIcons/plusLightening';
import { createStackNavigator } from 'react-navigation-stack';
import CreateCampScreen from '../../screens/CreateCampScreen';
import { withNavigation } from 'react-navigation';

const AddCampaignHeader = props => {
  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('CreateCampaign');
          }}
        >
          <View>
            <PlusLightening />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withNavigation(AddCampaignHeader);
