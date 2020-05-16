import React from 'react';
import { TextInput, Text, View, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../constants/screens/CreateCampaignUpdateScreen';

import { postCampaignUpdate } from '../store/actions';
import BackButton from '../components/BackButton';
import UploadMedia from '../components/UploadMedia';
import PublishButton from '../components/PublishButton';

class CreateCampaignUpdateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update Post',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <PublishButton
          navigation={navigation}
          pressAction={navigation.getParam('publish')}
        />
      ),
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
  };

  componentDidMount() {
    this.props.navigation.setParams({ publish: this.publish });
  }

  publish = async () => {
    if (!this.state.image || !this.state.description) {
      const errorMessage =
        'Form incomplete. Please include:' +
        (this.state.image ? '' : '\n    - Update Image') +
        (this.state.description ? '' : '\n    - Update Details');
      return Alert.alert('Error', errorMessage);
    } else {
      const campaignUpdate = {
        description: this.state.description,
        campaign_id:
          this.selectedCampaign.campaign_id || this.selectedCampaign.id,
        image: this.state.image,
      };
      this.props.postCampaignUpdate(campaignUpdate);

      this.props.navigation.goBack();
    }
  };

  clearState = () => {
    this.setState({
      description: '',
      image: '',
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <NavigationEvents onDidBlur={this.clearState} />
        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <UploadMedia
                title="UPLOAD NEW IMAGE"
                media={this.state.image}
                onChangeMedia={(media) => this.setState({ image: media })}
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
              ref={(input) => {
                this.campaignDetailsInput = input;
              }}
              returnKeyType="next"
              placeholder="Write an update here to tell people what has happened since their donation."
              style={styles.inputContain2}
              onChangeText={(text) => this.setState({ description: text })}
              multiline={true}
              value={this.state.description}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps, {
  postCampaignUpdate,
})(CreateCampaignUpdateScreen);
