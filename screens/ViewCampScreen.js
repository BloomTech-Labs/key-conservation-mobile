import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,  
  Image
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';

import { getProfileData } from '../store/actions'
import BackButton from '../components/BackButton'
import styles from '../constants/Stylesheet';


class ViewCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerRight:  <View />
    };
  };

  goToProfile = () => {
    this.props.getProfileData(this.props.selectedCampaign.users_id);
    this.props.navigation.navigate('Pro');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ListItem
            onPress={this.goToProfile}
            title={
              <View>
                <Text style={styles.orgTitleView}>{this.props.selectedCampaign.username}</Text>
              </View>
            }
            leftAvatar={{ source: { uri: this.props.selectedCampaign.profile_image } }}
            subtitle={this.props.selectedCampaign.location}
          />
          
            <Text style={styles.campTitle}>{this.props.selectedCampaign.camp_name}</Text>            
              <Image
                source={{ uri: this.props.selectedCampaign.camp_img }}
                style={styles.campImgContain}
              />
          
          <View style={styles.campDesc}>
            <Text>
              <Text style={styles.campDescUsername}>{this.props.selectedCampaign.username}</Text>
              &nbsp;&nbsp;{this.props.selectedCampaign.camp_desc}
            </Text>
          </View>
          <View>
            <View style={styles.campMission}>
              <SvgUri
                width='25'
                height='25'
                source={require('../assets/icons/hand.svg')}
              />
              <Text style={styles.campMissionText}>Support Our Mission</Text>
            </View>
            <View style={styles.donateButton}>
              <TouchableOpacity
                style={styles.touchableButton}
                // If these links are empty string and don't have an http:// or a https:// it will send you with unpromised rejections.
                onPress={async () =>
                  this.props.selectedCampaign.camp_cta &&
                  this.props.selectedCampaign.camp_cta !== null &&
                  (await WebBrowser.openBrowserAsync(this.props.selectedCampaign.camp_cta))
                }
              >
                <View style={styles.touchableView}>
                  <Text style={styles.touchableText}>Donate</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign
});

export default connect(
  mapStateToProps,
  { getProfileData }
)(ViewCampScreen);

