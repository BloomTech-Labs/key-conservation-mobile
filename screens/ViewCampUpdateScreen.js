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

class ViewCampUpdateScreen extends React.Component {
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
          onPress={navigation.getParam('showCampUpdateOptions')}
        >
          <Ellipse width='25' height='25' />
        </TouchableOpacity>
      )
    };
  };

  state = {
    likes: this.props.navigation.state.params.likes,
    userLiked: this.props.navigation.state.params.userLiked,
    campaign: {}
  };

  showActionSheet = () => {
    this.ActionSheet?.show();
  };

  componentDidMount = () => {
    this.props.navigation.setParams({
      showCampUpdateOptions: this.showActionSheet
    });
    this.getCampaign();
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
            this.props.selectedCampaign.users_id
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
                uri: this.props.selectedCampaign.update_img
              }}
              rate={1.0}
              volume={1.0}
              useNativeControls={true}
              resizeMode='cover'
              style={styles.campImgContain}
            />
          ) : (
            <Image
              source={{ uri: this.props.selectedCampaign.update_img }}
              style={styles.campImgContain}
            />
          )}
          <View style={styles.campDescContain}>
            <Text style={styles.campDescName}>
              {this.props.selectedCampaign.camp_name}
            </Text>
            <Text style={styles.campDesc}>
              {this.props.selectedCampaign.update_desc}
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
      selectedProfile: this.props.selectedCampaign.users_id
    });
  };

  getCampaign = async () => {
    const camp = await this.props.getCampaign(this.props.selectedCampaign.camp_id);
    this.setState({
      campaign: camp?.data?.camp
    })
    // axios
    //   .get(`${seturl}campaigns/${this.props.selectedCampaign.camp_id}`, {
    //     headers: {
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${this.props.token}`,
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(res => {
    //     this.setState({
    //       ...this.state,
    //       campaign: res.data.camp
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  goToCampaign = async () => {
    await this.props.getCampaign(this.props.selectedCampaign.camp_id);
    this.props.navigation.navigate('Camp', {
      likes: this.state.campaign.likes.length,
      userLiked: this.props.navigation.state.params.userLiked,
      addLike: this.props.navigation.state.params.addLike,
      deleteLike: this.props.navigation.state.params.deleteLike,
      media: this.state.campaign.camp_img
    });
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
  campMissionText: {
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
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  hearts: {
    marginHorizontal: 15
  },
  heartOutline: {
    fontSize: 28,
    color: 'black'
  },
  heartFill: {
    fontSize: 30,
    color: '#e60024'
  },
  campDescContain: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 22,
    paddingBottom: 10
  },
  campDesc: {
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

export default connect(mapStateToProps, { getCampaign })(ViewCampUpdateScreen);
