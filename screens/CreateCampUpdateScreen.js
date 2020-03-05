import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../constants/screens/CreateCampScreen';

import {
  postCampaignUpdate,
  clearMedia,
  getProfileData
} from '../store/actions';
import BackButton from '../components/BackButton';
import PublishButton from '../components/PublishButton';
import UploadMedia from '../components/UploadMedia';

class CreateCampUpdateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update Post',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <PublishButton
          navigation={navigation}
          pressAction={navigation.getParam('publish')}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.selectedCampaign =
      this.props.navigation.getParam('selectedCampaign') || {};
  }

  state = {
    update_desc: '',
    loading: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ publish: this.publish });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color='#00FF9D' />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <NavigationEvents
          onWillFocus={this.props.clearMedia}
          onDidBlur={this.clearState}
        />
        <View style={styles.sectionContainer}>
          <View style={styles.goToCampaignButton}>
            <Text style={styles.goToCampaignText}>Post an update about</Text>
          </View>
          <Text style={styles.sectionsText}>
            "{this.selectedCampaign.camp_name}"
          </Text>
          <UploadMedia title='Upload update image' />
          <TextInput
            ref={input => {
              this.campDetailsInput = input;
            }}
            returnKeyType='next'
            placeholder='Write an update here to tell people what has happened since their donation.'
            style={styles.inputContain2}
            onChangeText={text => this.setState({ update_desc: text })}
            multiline={true}
            value={this.state.update_desc}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }

  publish = async () => {
    this.setState({
      ...this.state,
      loading: true
    });
    if (!this.props.mediaUpload || !this.state.update_desc) {
      const errorMessage =
        'Form incomplete. Please include:' +
        (this.props.mediaUpload ? '' : '\n    - Update Image') +
        (this.state.update_desc ? '' : '\n    - Update Details');
      return Alert.alert('Error', errorMessage);
    } else {
      const campUpdate = {
        update_desc: this.state.update_desc,
        users_id: this.props.currentUserProfile.id,
        camp_id: this.selectedCampaign.camp_id,
        update_img: this.props.mediaUpload
      };
      // console.log(this.selectedCampaign);
      this.postCampaignUpdate(campUpdate);
    }
  };

  postCampaignUpdate = campUpdate => {
    if (
      this.props.mediaUpload.includes('.mov') ||
      this.props.mediaUpload.includes('.mp3') ||
      this.props.mediaUpload.includes('.mp4')
    ) {
      Alert.alert("We're uploading your video!");
    }

    this.props.postCampaignUpdate(campUpdate).then(err => {
      if (err) {
        this.setState({
          ...this.state,
          loading: false
        });
        Alert.alert('Error', 'Failed to post campaign update');
      } else {
        this.props.getProfileData(this.props.currentUserProfile.id, null, true);
        this.setState({
          ...this.state,
          loading: false
        });
        this.props.navigation.goBack();
      }
    });
  };

  clearState = () => {
    this.setState({
      update_desc: ''
    });
  };
}
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  mediaUpload: state.mediaUpload
});
export default connect(mapStateToProps, {
  postCampaignUpdate,
  getProfileData,
  clearMedia
})(CreateCampUpdateScreen);
