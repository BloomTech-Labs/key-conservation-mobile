import React from 'react';
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editCampaign, getCampaigns, clearMedia } from '../store/actions';
import BackButton from '../components/BackButton';

import DoneButton from '../components/DoneButton';
import UploadMedia from '../components/UploadMedia';

import styles from '../constants/screens/EditCampScreen';

class CreateCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Campaign',
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
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('edit')}
        />
      )
    };
  };

  state = {
    camp_img: this.props.selectedCampaign.camp_img,
    camp_name: this.props.selectedCampaign.camp_name,
    camp_desc: this.props.selectedCampaign.camp_desc,
    camp_cta: this.props.selectedCampaign.camp_cta
  };

  componentDidMount() {
    this.props.navigation.setParams({ edit: this.edit });
  }

  edit = async () => {
    if (
      !this.state.camp_img ||
      !this.state.camp_name ||
      !this.state.camp_desc ||
      !this.state.camp_cta
    ) {
      return;
    } else {
      let changes = this.state;
      if (this.props.mediaUpload) {
        changes = {
          ...this.state,
          camp_img: this.props.mediaUpload
        };
      }
      await this.props.editCampaign(this.props.selectedCampaign.camp_id, changes);
      this.props.navigation.goBack();
    }
  };

  clearState = () => {
    this.setState({
      camp_img: this.props.selectedCampaign.camp_img,
      camp_name: this.props.selectedCampaign.camp_name,
      camp_desc: this.props.selectedCampaign.camp_desc,
      camp_cta: this.props.selectedCampaign.camp_cta
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
  selectedCampaign: state.selectedCampaign,
  mediaUpload: state.mediaUpload
});

export default connect(
  mapStateToProps,
  { editCampaign, getCampaigns, clearMedia }
)(CreateCampScreen);
