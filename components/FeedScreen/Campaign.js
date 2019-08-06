import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { ListItem, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import { getProfileData } from '../../store/actions';

import styles from '../../constants/Stylesheet';

const Campaign = props => {
  const dispatch = useDispatch();
  const { title, users_id } = props.data;

  const handlePress = () => {
    dispatch(getProfileData(users_id));
    props.navigation.navigate('Pro', { orgId: users_id });
  };

  return (
    <View style={styles.container}>
      <ListItem
        onPress={() => handlePress(users_id)}        
        title={
          <View>
            <Text style={styles.orgTitleView}>{props.data.username}</Text>
          </View>}
        leftAvatar={{ source: { uri: props.data.profile_image } }}
        subtitle={props.data.location}
      />
      <View>
        <Text style={styles.campTitle}>{props.data.camp_name}</Text>
        <Image
          source={{ uri: props.data.camp_img }}
          style={styles.campImgContain}
        />
      </View>
      <View style={styles.campDesc}>        
           
        <Text><Text style={styles.campDescUsername}>{props.data.username}</Text> {props.data.camp_desc}</Text>        
      </View>
      <View>
        <View style={styles.campMission}>
          <Icon type='font-awesome' name='rocket' style={styles.campIcon}>Icon</Icon>
          <Text style={styles.campMissionText}>Support Our Mission</Text>
        </View>
        <View style={styles.donateButton}>
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={async () =>
              await WebBrowser.openBrowserAsync(props.data.org_link_url)
            }
          >
            <View style={styles.touchableView}>
              <Text style={styles.touchableText}>Donate</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

Campaign.navigationOptions = {
  title: 'Profile',
  // This setting needs to be on every screen so that header is in the center
  // This is fix for android devices should be good on IOS
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center'
  }
};

export default Campaign;
