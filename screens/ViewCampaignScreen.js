import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native-animatable';
import { Video } from 'expo-av';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getOriginalPost } from '../store/actions';
import moment from 'moment';
import { Viewport } from '@skele/components';
import { navigate } from '../navigation/RootNavigator';

import BackButton from '../components/BackButton';
import CommentsView from '../components/Comments/CommentsView';
import styles from '../constants/screens/ViewCampaignScreen';
import Ellipse from '../assets/jsicons/Ellipse';
import CampaignActionSheet from '../components/Reports/CampaignActionSheet';
import TakeActionCallToAction from '../components/TakeAction/TakeActionCallToAction';
import MapMarker from '../assets/jsicons/headerIcons/map-marker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ViewCampaignScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Campaign',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} popToTop />,
      headerRight: () => (
        <TouchableOpacity
          style={{
            transform: [{ rotate: '90deg' }],
            padding: 16,
            paddingRight: 24,
          }}
          onPress={navigation.getParam('showCampaignOptions')}
        >
          <Ellipse width="25" height="25" />
        </TouchableOpacity>
      ),
    };
  };

  state = {};

  componentDidMount() {
    const campaign_id = this.props.navigation.getParam('campaign_id');

    if (campaign_id) {
      console.log(`fetching original post for campaign id ${campaign_id}`);
      this.props.getOriginalPost(campaign_id).finally(() => {
        this.loadPostData();
      });
    } else this.loadPostData();

    this.props.navigation.setParams({
      showCampaignOptions: this.showActionSheet,
    });
  }

  loadPostData() {
    const campaignPost = this.props.selectedCampaign || {};

    let urgencyColor;
    if (campaignPost.is_update) {
      urgencyColor = 'rgba(202,255,0, 0.7)';
    } else if (campaignPost.urgency === 'Critical') {
      urgencyColor = 'rgba(227,16,89,0.6)';
    } else if (campaignPost.urgency === 'Urgent') {
      urgencyColor = 'rgba(255,199,0,0.6)';
    } else if (campaignPost.urgency === 'Longterm') {
      urgencyColor = 'rgba(0,255,157,0.6)';
    } else {
      urgencyColor = 'none';
    }

    let urgencyStatus;
    if (
      campaignPost.is_update ||
      !campaignPost.urgency ||
      campaignPost.urgency == 'null'
    ) {
      urgencyStatus = 'Update';
    } else {
      urgencyStatus = campaignPost.urgency.toUpperCase();
    }

    this.setState((prevState) => ({
      urgencyColor,
      urgencyStatus,
      createdAt: campaignPost.created_at
        ? moment(campaignPost.created_at).fromNow()
        : '...',
      ...campaignPost,
    }));
  }

  showActionSheet = () => {
    this.ActionSheet?.show();
  };

  viewOriginalPost = () => {
    if (typeof Number(this.campaign_id) === 'number') {
      navigate(
        'Campaign',
        {
          campaign_id: this.state.campaign_id,
        },
        `${this.state.campaign_id}_${this.state.id}`
      );
    } else {
      console.log('Could not navigate to original post, invalid campaign id');
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView extraScrollHeight={50} enableOnAndroid={false}>
          {this.state.is_update ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.viewOriginalPost}
            >
              <View style={styles.viewOriginalPost}>
                <Text style={styles.viewOriginalPostText}>
                  View Original Post
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.container}>
            {!this.props.loading ? (
              <CampaignActionSheet
                admin={this.props.currentUserProfile.admin}
                campaign={this.state}
                ref={(o) => (this.ActionSheet = o)}
                isMine={
                  this.props.currentUserProfile.admin === this.state.user_id
                }
                goBack
              />
            ) : null}
            <Viewport.Tracker>
              <View>
                <View style={styles.topRow}>
                  <View style={styles.topRowLeft}>
                    <Text style={styles.postTitle}>{this.state.name}</Text>
                  </View>
                  <View style={styles.topRowRight}>
                    <Text style={styles.timeText}>{this.state.createdAt}</Text>
                  </View>
                </View>
                <ListItem
                  onPress={this.goToProfile}
                  title={
                    <View>
                      <Text style={styles.listName}>{this.state.org_name}</Text>
                    </View>
                  }
                  leftAvatar={{
                    source: {
                      uri: this.state.profile_image || undefined,
                    },
                  }}
                  subtitle={
                    <View style={{ flexDirection: 'row' }}>
                      {this.state.location !== (undefined || null) ? (
                        <MapMarker fill="#505050" />
                      ) : null}
                      <Text style={{ color: '#929292', paddingLeft: 3 }}>
                        {this.state.location}
                      </Text>
                    </View>
                  }
                />
                <View style={styles.campaignDescriptionContainer}>
                  {/* <Text style={styles.campaignDescriptionName}>
                    {this.state.name}
                  </Text> */}
                  <Text style={styles.campaignDescription}>
                    {this.state.description}
                  </Text>
                </View>
                {this.state.image?.includes('.mov') ||
                this.state.image?.includes('.mp3') ||
                this.state.image?.includes('.mp4') ? (
                  <Video
                    source={{
                      uri: this.state.image,
                    }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    useNativeControls={true}
                    resizeMode="cover"
                    style={styles.campaignImageContainer}
                  />
                ) : (
                  <Image
                    source={{ uri: this.state.image }}
                    style={styles.campaignImageContainer}
                  />
                )}

                <View style={styles.donateView}>
                  <TakeActionCallToAction donate={this.state} />
                </View>

                <View style={styles.commentsView}>
                  {this.props.loading ? (
                    <Text>Comments loading...</Text>
                  ) : (
                    <CommentsView />
                  )}
                </View>
              </View>
            </Viewport.Tracker>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  addBookmark = () => {
    this.setState({
      ...this.state,
      userBookmarked: true,
    });
    this.props.navigation.state.params.addBookmark();
  };

  deleteBookmark = () => {
    this.setState({
      ...this.state,
      userBookmarked: false,
    });
    this.props.navigation.state.params.deleteBookmark();
  };

  goToProfile = () => {
    this.props.navigation.navigate('Pro', {
      selectedProfile: this.state.user_id,
    });
  };
}

const mapStateToProps = (state) => ({
  loading: state.pending.getCampaign,
  selectedCampaign: state.selectedCampaign,
  currentUser: state.currentUser,
  currentUserProfile: state.currentUserProfile,
  token: state.token,
});

export default connect(mapStateToProps, { getOriginalPost })(
  ViewCampaignScreen
);
