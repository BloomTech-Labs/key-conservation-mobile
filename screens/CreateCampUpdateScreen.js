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
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={90}
        enabled={Platform.OS === 'android' ? true : false}
      >
        <KeyboardAwareScrollView>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: '#fff',
              minHeight: '100%'
            }}
          >
            <NavigationEvents
              onWillFocus={this.props.clearMedia}
              onDidBlur={this.clearState}
            />
            <View style={styles.sectionContainer}>
              <View style={styles.sections}>
                <UploadMedia title='Upload update image' />
              </View>

              <View style={styles.sections}>
                <View style={styles.goToCampaignButton}>
                  <Text style={styles.goToCampaignText}>Update</Text>
                </View>
                <Text style={styles.sectionsText}>
                  {this.selectedCampaign.camp_name}
                </Text>
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
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
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
      console.log(this.selectedCampaign);
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

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#f5f5f5',
    paddingLeft: 10,
    paddingRight: 10,
    height: 75
  },
  TouchableOpacity: {},
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },
  CancelButton: {
    fontSize: 16,
    color: 'black'
  },
  PublishButton: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  camera: {
    backgroundColor: '#C4C4C4',
    width: '100%',
    height: 150,
    flexDirection: 'row'
  },
  CameraContainerButton: {
    marginTop: 120,
    marginRight: 10,
    marginLeft: 10
  },
  inputContain2: {
    height: 146,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 25,
    textAlignVertical: 'top'
  },
  Card: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 25
  },
  cardPara: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 13
  },
  sectionsText: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center'
  },
  goToCampaignButton: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    width: '100%'
  },
  goToCampaignText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
