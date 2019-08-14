import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { ListItem, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { getProfileData, getCampaign } from '../../store/actions';

import SvgUri from 'react-native-svg-uri';

import styles from '../../constants/Stylesheet';

const FeedCampaign = props => {
  const dispatch = useDispatch();
  const { title, users_id, camp_id } = props.data;

  const goToProfile = () => {
    dispatch(getProfileData(users_id));
    props.navigation.navigate('Pro');
  };

  const goToCampaign = async () => {
    await dispatch(getCampaign(camp_id));
    props.navigation.navigate('Camp');
  };

  return (
    <View style={styles.container}>
      <ListItem
        onPress={() => goToProfile()}
        title={
          <View>
            <Text style={styles.orgTitleView}>{props.data.username}</Text>
          </View>
        }
        leftAvatar={{ source: { uri: props.data.profile_image } }}
        subtitle={props.data.location}
      />
      <View>
        <Text style={styles.campTitle}>{props.data.camp_name}</Text>
        <TouchableOpacity activeOpacity = { .5 } onPress={() => goToCampaign()}>
          <Image
            source={{ uri: props.data.camp_img }}
            style={styles.campImgContain}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.campDesc}>
        <Text>
          <Text style={styles.campDescUsername}>{props.data.username}</Text>
          &nbsp;&nbsp;{props.data.camp_desc}
        </Text>
      </View>
      <View>
        <View style={styles.campMission}>
          <SvgUri
            width='25'
            height='25'
            source={require('../../assets/icons/hand.svg')}
          />
          <Text style={styles.campMissionText}>Support Our Mission</Text>
        </View>
        <View style={styles.donateButton}>
          <TouchableOpacity
            style={styles.touchableButton}
            // If these links are empty string and don't have an http:// or a https:// it will send you with unpromised rejections.
            onPress={async () =>
              props.data.camp_cta &&
              props.data.camp_cata !== null &&
              (await WebBrowser.openBrowserAsync(props.data.camp_cta))
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

FeedCampaign.navigationOptions = {
  title: 'Profile',
  // This setting needs to be on every screen so that header is in the center
  // This is fix for android devices should be good on IOS
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center'
  }
};

export default FeedCampaign;
