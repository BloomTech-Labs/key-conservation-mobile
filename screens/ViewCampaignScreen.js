import React from 'react';
import { Text, TouchableOpacity, Image, Platform } from 'react-native';
import { View } from 'react-native-animatable';
import { Video } from 'expo-av';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import { getCampaignPost } from '../store/actions';
import moment from 'moment';
import { Viewport } from '@skele/components';

import BackButton from '../components/BackButton';
import FeedUpdate from '../components/FeedScreen/FeedUpdate';
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

  componentDidMount() {
    console.log('getting post id: ', this.props.selectedCampaign.id);
    this.props.getCampaignPost(this.props.selectedCampaign.id);
    this.props.navigation.setParams({
      showCampaignOptions: this.showActionSheet,
    });
  }

  state = {
    userBookmarked: this.props.selectedCampaign.userBookmarked,
  };

  showActionSheet = () => {
    this.ActionSheet?.show();
  };

  render() {
    const createdAt = this.props.selectedCampaign.created_at;
    const timeDiff = createdAt ? moment(createdAt).fromNow() : '...';

    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {!this.props.loading ? (
            <CampaignActionSheet
              admin={this.props.currentUserProfile.admin}
              campaign={this.props.selectedCampaign}
              ref={(o) => (this.ActionSheet = o)}
              isMine={
                this.props.currentUserProfile.admin ===
                this.props.selectedCampaign.user_id
              }
              goBack
            />
          ) : null}
          <KeyboardAwareScrollView
            extraScrollHeight={50}
            enableOnAndroid={false}
          >
            <Viewport.Tracker>
              <View>
                <ListItem
                  onPress={this.goToProfile}
                  title={
                    <View>
                      <Text style={styles.listName}>
                        {this.props.selectedCampaign.org_name}
                      </Text>
                    </View>
                  }
                  leftAvatar={{
                    source: {
                      uri: this.props.selectedCampaign.profile_image || '',
                    },
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
                  <Text style={styles.timeText}>{timeDiff}</Text>
                </View>
                {this.props.selectedCampaign.image.includes('.mov') ||
                this.props.selectedCampaign.image.includes('.mp3') ||
                this.props.selectedCampaign.image.includes('.mp4') ? (
                  <Video
                    source={{
                      uri: this.props.selectedCampaign.image,
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
                    source={{ uri: this.props.selectedCampaign.image }}
                    style={styles.campaignImageContainer}
                  />
                )}

                <View style={styles.donateView}>
                  <TakeActionCallToAction
                    donate={this.props.selectedCampaign}
                  />
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
          </KeyboardAwareScrollView>
        </View>
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
      selectedProfile: this.props.selectedCampaign.user_id,
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

export default connect(mapStateToProps, { getCampaignPost })(
  ViewCampaignScreen
);
