import React from 'react';
import {
  TextInput,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../constants/screens/CreateCampaignUpdateScreen';

import { postCampaignUpdate, getProfileData } from '../store/actions';
import BackButton from '../components/BackButton';
import UploadMedia from '../components/UploadMedia';
import PublishButton from '../components/PublishButton';

class CreateCampaignUpdateScreen extends React.Component {
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
    image: '',
    description: '',
    loading: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ publish: this.publish });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#00FF9D" />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <NavigationEvents onDidBlur={this.clearState} />
        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <UploadMedia
                title="UPLOAD NEW IMAGE"
                media={this.state.image}
                onChangeMedia={media => this.setState({ image: media })}
                style={styles.uploadMedia}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.sectionsText}>Post an update about:</Text>
              <Text style={styles.subtitleText}>
                "{this.selectedCampaign.name}"
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <TextInput
              ref={input => {
                this.campaignDetailsInput = input;
              }}
              returnKeyType="next"
              placeholder="Write an update here to tell people what has happened since their donation."
              style={styles.inputContain2}
              onChangeText={text => this.setState({ description: text })}
              multiline={true}
              value={this.state.description}
            />
          </View>
        </View>
        {/* <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={this.publish}>
            <View style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Publish Live</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </KeyboardAwareScrollView>
    );
  }

  publish = async () => {
    if (!this.state.image || !this.state.description) {
      const errorMessage =
        'Form incomplete. Please include:' +
        (this.state.image ? '' : '\n    - Update Image') +
        (this.state.description ? '' : '\n    - Update Details');
      return Alert.alert('Error', errorMessage);
    } else {
      this.setState({
        loading: true
      });
      const campaignUpdate = {
        description: this.state.description,
        user_id: this.props.currentUserProfile.id,
        campaign_id: this.selectedCampaign.id,
        image: this.state.image
      };
      this.postCampaignUpdate(campaignUpdate);
    }
  };

  postCampaignUpdate = campaignUpdate => {
    if (
      this.state.image.includes('.mov') ||
      this.state.image.includes('.mp3') ||
      this.state.image.includes('.mp4')
    ) {
      Alert.alert("We're uploading your video!");
    }

    this.props.postCampaignUpdate(campaignUpdate).then(err => {
      if (err) {
        this.setState({
          ...this.state,
          loading: false
        });
        console.log(err);
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
      description: '',
      image: ''
    });
  };
}
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});
export default connect(mapStateToProps, {
  postCampaignUpdate,
  getProfileData
})(CreateCampaignUpdateScreen);
