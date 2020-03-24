import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import { View } from 'react-native-animatable';
import axios from 'axios';
import { Video } from 'expo-av';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';

import { getCampaign } from '../store/actions';
import BackButton from '../components/BackButton';
import Ellipse from '../assets/jsicons/Ellipse';
import CampaignActionSheet from '../components/Reports/CampaignActionSheet';

const deviceWidth = Dimensions.get('window').width;

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
          <Ellipse width='25' height='25' />
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
                <Text style={styles.listName}>
                  {this.props.selectedCampaign.name}
                </Text>
              </View>
            }
            leftAvatar={{
              source: { uri: this.props.selectedCampaign.profile_image }
            }}
            subtitle={this.props.selectedCampaign.location}
          />
          {this.props.navigation.state.params.media.includes('.mov') ||
          this.props.navigation.state.params.media.includes('.mp3') ||
          this.props.navigation.state.params.media.includes('.mp4') ? (
            <Video
              source={{
                uri: this.props.selectedCampaign.update_image
              }}
              rate={1.0}
              volume={1.0}
              useNativeControls={true}
              resizeMode='cover'
              style={styles.campImgContain}
            />
          ) : (
            <Image
              source={{ uri: this.props.selectedCampaign.update_image }}
              style={styles.campImgContain}
            />
          )}
          <View style={styles.campaignDescriptionContainer}>
            <Text style={styles.campaignDescriptionName}>
              {this.props.selectedCampaign.name}
            </Text>
            <Text style={styles.campaignDescriptionName}>
              {this.props.selectedCampaign.description}
            </Text>
          </View>
          <View style={styles.ogBorder} />
          <View style={styles.ogPostView}>
            <View style={styles.ogPostButton}>
              <TouchableOpacity
                style={styles.touchableButton}
                // If these links are empty string and don't have an http:// or a https:// it will send you with unpromised rejections.
                onPress={this.goToCampaign}
              >
                <View style={styles.touchableView}>
                  <Text style={styles.touchableText}>View Original Post</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.whiteSpace} />
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
    try{
      await this.props.getCampaign(this.props.selectedCampaign.id);
      this.props.navigation.navigate('Campaign', {
        media: this.props.selectedCampaign.image
      });
    } catch (err) {console.log(err);}
  };
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign,
  token: state.token,
  currentUserProfile: state.currentUserProfile
});

const styles = StyleSheet.create({
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: '100%',
    height: 50
  },
  touchableView: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243
  },
  touchableText: {
    fontFamily: 'Lato',
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16
  },
  ogPostButton: {
    fontFamily: 'Lato-Bold',
    width: '60%',
    alignSelf: 'center'
  },
  supportMissionText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    paddingLeft: 10
  },
  campaignMissionText: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19,
    paddingTop: 10
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    // resizeMode: 'contain',
    // height: deviceWidth <= 415 ? deviceWidth : 415
    flex: 1,
    height: deviceWidth,
    width: deviceWidth
  },
  campaignDescriptionContainer: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campaignDescriptionName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 22,
    paddingBottom: 10
  },
  campaignDescription: {
    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 19,
    paddingBottom: 15
  },
  listName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 22
  },
  ogPostView: {
    alignItems: 'center'
  },
  ogBorder: {
    marginLeft: '16%',
    marginRight: '16%',
    marginTop: 20,
    paddingTop: 19,
    borderTopWidth: 2,
    borderTopColor: '#eee'
  },
  whiteSpace: {
    height: 40
  }
});

export default connect(mapStateToProps, { getCampaign })(ViewCampaignUpdateScreen);
