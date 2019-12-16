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
import { FontAwesome } from '@expo/vector-icons';

import { getProfileData, getCampaign } from '../store/actions';
import BackButton from '../components/BackButton';

const deviceWidth = Dimensions.get('window').width;

// Redux gave us a hard time on this project. We worked on comments first and when our commentOnCampaign action failed to trigger the re-render we expected, and when we couldn't solve the
// issue in labs_help, we settled for in-component axios calls. Not elegant. Probably not super scalable—but it worked. Hopefully a more talented team can solve what we couldn't.
// In the meantime, ViewCampScreen, ViewCampUpdateScreen, FeedCampaign, and FeedUpdate are all interconnected, sharing props (state, functions) via React-Navigation.

class ViewCampUpdateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update',
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
      headerRight: <View />
    };
  };

  state = {
    likes: this.props.navigation.state.params.likes,
    userLiked: this.props.navigation.state.params.userLiked,
    campaign: {}
  };

  componentDidMount = () => {
    this.getCampaign();
  };

  render() {
    return (
      <ScrollView>
        <View>
          <ListItem
            onPress={this.goToProfile}
            title={
              <View>
                <Text style={styles.listUsername}>
                  {this.props.selectedCampaign.username}
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
{/* 
          <View style={styles.likesContainer}>
            <View style={styles.hearts}>
              <View
                style={!this.state.userLiked ? { zIndex: 1 } : { zIndex: -1 }}
              >
                <FontAwesome
                  onPress={() =>
                    this.addLike(
                      this.props.selectedCampaign.camp_id,
                      this.props.selectedCampaign.update_id
                    )
                  }
                  name='heart-o'
                  style={styles.heartOutline}
                />
              </View>
              <View
                animation={this.state.userLiked ? 'zoomIn' : 'zoomOut'}
                style={
                  (this.state.userLiked ? { zIndex: 1 } : { zIndex: -1 },
                  Platform.OS === 'android'
                    ? { marginTop: -29, marginLeft: -1.25 }
                    : { marginTop: -28.75, marginLeft: -1.25 })
                }
                duration={300}
              >
                <FontAwesome
                  onPress={() =>
                    this.deleteLike(
                      this.props.selectedCampaign.camp_id,
                      this.props.selectedCampaign.update_id
                    )
                  }
                  name='heart'
                  style={styles.heartFill}
                />
              </View>
            </View>
            {this.state.likes === 0 ? null : this.state.likes > 1 ? (
              <Text style={styles.likes}>{this.state.likes} likes</Text>
            ) : (
              <Text style={styles.likes}>{this.state.likes} like</Text>
            )}
          </View> */}
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

  addLike = (campId, updateId) => {
    this.setState({
      ...this.state,
      likes: this.state.likes + 1,
      userLiked: true
    });
    this.props.navigation.state.params.addLike(campId, updateId);
  };

  deleteLike = (campId, updateId) => {
    this.setState({
      ...this.state,
      likes: this.state.likes - 1,
      userLiked: false
    });
    this.props.navigation.state.params.deleteLike(campId, updateId);
  };

  goToProfile = async () => {
    await this.props.getProfileData(this.props.selectedCampaign.users_id);
    this.props.navigation.navigate('Pro');
  };

  getCampaign = () => {
    axios
      .get(
        `https://key-conservation.herokuapp.com/api/campaigns/${this.props.selectedCampaign.camp_id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.props.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        this.setState({
          ...this.state,
          campaign: res.data.camp
        });
      })
      .catch(err => {
        console.log(err);
      });
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
    fontFamily: 'Futura',
    color: '#323338',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16
  },
  ogPostButton: {
    fontFamily: 'Futura-Medium',
    width: '60%',
    alignSelf: 'center'
  },
  supportMissionText: {
    fontFamily: 'Futura-Medium',
    fontSize: 14,
    paddingLeft: 10
  },
  campMissionText: {
    fontFamily: 'Futura',
    fontSize: 14,
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
    fontFamily: 'Futura-Medium',
    fontSize: 16,
    lineHeight: 22
  },
  campDesc: {
    fontFamily: 'Futura',
    fontSize: 14,
    lineHeight: 19,
    paddingBottom: 15
  },
  listUsername: {
    fontFamily: 'Futura-Medium',
    fontSize: 16,
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

export default connect(
  mapStateToProps,
  { getProfileData, getCampaign }
)(ViewCampUpdateScreen);
