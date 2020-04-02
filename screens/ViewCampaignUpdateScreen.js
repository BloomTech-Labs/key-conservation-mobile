import React from 'react';
import { Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { Video } from 'expo-av';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';

import { getCampaign } from '../store/actions';
import BackButton from '../components/BackButton';
import Ellipse from '../assets/jsicons/Ellipse';
import CampaignActionSheet from '../components/Reports/CampaignActionSheet';
import MapMarker from '../assets/jsicons/headerIcons/map-marker';

import styles from '../constants/screens/ViewCampaignUpdateScreen';

class ViewCampaignUpdateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <TouchableOpacity
          style={{
            transform: [{ rotate: '90deg' }],
            padding: 16,
            paddingRight: 24
          }}
          onPress={navigation.getParam('showCampaignUpdateOptions')}
        >
          <Ellipse width="25" height="25" />
        </TouchableOpacity>
      )
    };
  };

  showActionSheet = () => {
    this.ActionSheet?.show();
  };

  componentDidMount = () => {
    this.props.navigation.setParams({
      showCampaignUpdateOptions: this.showActionSheet
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <CampaignActionSheet
              ref={o => (this.ActionSheet = o)}
              admin={this.props.currentUserProfile.admin}
              update={this.props.selectedCampaign}
              isMine={
                this.props.currentUserProfile.admin ===
                this.props.selectedCampaign.user_id
              }
              goBack
            />
            <View>
              <ListItem
                onPress={this.goToProfile}
                title={
                  <View>
                    <Text style={styles.listName}>{this.props.data.name}</Text>
                  </View>
                }
                leftAvatar={{
                  source: { uri: this.props.selectedCampaign.profile_image }
                }}
                subtitle={
                  <View style={{ flexDirection: 'row' }}>
                    {this.props.selectedCampaign.location !==
                    (undefined || null) ? (
                      <MapMarker fill="#505050" />
                    ) : null}
                    <Text style={{ color: '#929292' }}>
                      {this.props.selectedCampaign.location}
                    </Text>
                  </View>
                }
              />
              <View style={styles.campaignDescriptionContainer}>
                <Text style={styles.campaignDescriptionName}>
                  {this.props.selectedCampaign.name}
                </Text>
                <Text style={styles.campaignDescription}>
                  {this.props.selectedCampaign.description}
                </Text>
              </View>

              {this.props.navigation.state.params.media.includes('.mov') ||
              this.props.navigation.state.params.media.includes('.mp3') ||
              this.props.navigation.state.params.media.includes('.mp4') ? (
                <Video
                  source={{
                    uri: this.props.selectedCampaign.image
                  }}
                  rate={1.0}
                  volume={1.0}
                  useNativeControls={true}
                  resizeMode="contain"
                  style={styles.campImgContain}
                />
              ) : (
                <Image
                  source={{ uri: this.props.selectedCampaign.image }}
                  style={styles.campImgContain}
                />
              )}

              <View style={styles.ogBorder} />
              <View style={styles.ogPostView}>
                <View style={styles.ogPostButton}>
                  <TouchableOpacity
                    style={styles.touchableButton}
                    // If these links are empty string and don't have an http:// or a https:// it will send you with unpromised rejections.
                    onPress={this.goToCampaign}
                  >
                    <View style={styles.touchableView}>
                      <Text style={styles.touchableText}>
                        View Original Post
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.whiteSpace} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  goToProfile = () => {
    this.props.navigation.navigate('Pro', {
      selectedProfile: this.props.selectedCampaign.user_id
    });
  };

  goToCampaign = async () => {
    try {
      await this.props.getCampaign(this.props.selectedCampaign.campaign_id);
      this.props.navigation.navigate('Campaign', {
        media: this.props.selectedCampaign.image
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign,
  token: state.token,
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, { getCampaign })(
  ViewCampaignUpdateScreen
);
