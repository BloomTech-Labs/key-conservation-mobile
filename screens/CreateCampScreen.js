import React from 'react';
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postCampaign, getCampaigns, clearMedia } from '../store/actions';
import BackButton from '../components/BackButton';
import PublishButton from '../components/PublishButton';
import { AmpEvent } from '../components/withAmplitude';

import UploadMedia from '../components/UploadMedia';

import styles from '../constants/screens/CreateCampScreen';

class CreateCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold'
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerRight: (
        <PublishButton
          navigation={navigation}
          pressAction={navigation.getParam('publish')}
        />
      )
    };
  };
  state = {
    users_id: this.props.currentUserProfile.id,
    camp_name: '',
    camp_desc: '',
    camp_cta: ''
  };
  componentDidMount() {
    this.props.navigation.setParams({ publish: this.publish });
  }
  publish = async () => {
    if (
      !this.props.mediaUpload ||
      !this.state.camp_name ||
      !this.state.camp_desc ||
      !this.state.camp_cta
    ) {
      const errorMessage = 
        'Form incomplete. Please include:' +
        (this.props.mediaUpload ? '' : '\n    - Campaign Image') +
        (this.state.camp_name ? '' : '\n    - Campaign Name') +
        (this.state.camp_desc ? '' : '\n    - Campaign Details') +
        (this.state.camp_cta ? '' : '\n    - Donation Link')
      return (
        Alert.alert(
          'Error',
          errorMessage
        ));
    } else {
      const camp = {
        ...this.state,
        camp_img: this.props.mediaUpload
      };
      await this.props.postCampaign(camp);
      AmpEvent('Campaign Created');
      this.props.navigation.navigate('Home');
    }
  };
  clearState = () => {
    this.setState({
      users_id: this.props.currentUserProfile.id,
      camp_img: this.props.mediaUpload,
      camp_name: '',
      camp_desc: '',
      camp_cta: ''
    });
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior='height'
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
                <Text style={styles.sectionsText}>Campaign Name</Text>
                <TextInput
                  ref={input => {
                    this.campNameInput = input;
                  }}
                  returnKeyType='next'
                  placeholder='Koala In Need!'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ camp_name: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.campImgUrlInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.camp_name}
                />
              </View>
              <View style={styles.sections}>
                <UploadMedia />
               
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Campaign Details</Text>
                <TextInput
                  ref={input => {
                    this.campDetailsInput = input;
                  }}
                  returnKeyType='next'
                  placeholder='Add campaign details and list of monetary needs.'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ camp_desc: text })}
                  multiline={true}
                  value={this.state.camp_desc}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Donation Link</Text>
                <TextInput
                  ref={input => {
                    this.donationLinkInput = input;
                  }}
                  returnKeyType='next'
                  keyboardType='url'
                  placeholder='Please include full URL'
                  autoCapitalize='none'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ camp_cta: text })}
                  value={this.state.camp_cta}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  mediaUpload: state.mediaUpload
});
export default connect(
  mapStateToProps,
  { postCampaign, getCampaigns, clearMedia }
)(CreateCampScreen);
