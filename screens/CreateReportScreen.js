//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Picker,
  Alert,
  Platform
} from 'react-native';

import BackButton from '../components/BackButton';
import Collapsible from '../components/Collapsible';
import LoadingOverlay from '../components/LoadingOverlay';

import { connect } from 'react-redux';

import { createReport } from '../store/actions';

import { shorten } from '../util';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../constants/screens/CreateReportScreen';

class CreateReportScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Report',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      title: 'User',
      image: null,
      text_data: null,
      name: null,
      description: null,
      reporting: false
    };

    this.id = this.props.navigation.getParam('id');
    this.type = this.props.navigation.getParam('type');

    this.REPORT_REASONS = [
      '',
      `It's an attempt at scam`,
      `It's inappropriate/offensive`,
      `It's spam`,
      `Other`
    ];
  }

  componentDidMount() {
    switch (this.type) {
      case 'users': {
        const { profile_image: image, name } = this.props.selectedProfile;
        this.setState({
          image,
          name,
          title: 'account'
        });
        break;
      }
      case 'campaigns': {
        const {
          profile_image: image,
          name,
          description: text_data
        } = this.props.selectedCampaign;
        this.setState({
          image,
          name,
          text_data,
          title: 'campaign'
        });
        break;
      }
      case 'campaign_updates': {
        const {
          profile_image: image,
          name,
          descripton: text_data
        } = this.props.selectedCampaign;
        this.setState({
          image,
          name,
          text_data,
          title: 'campaign'
        });
        break;
      }
      case 'comments': {
        const {
          profile_image: image,
          body: text_data,
          name
        } = this.props.selectedCampaign.comments.find(
          com => com.id === this.props.navigation.getParam('id')
        );
        this.setState({
          image,
          name,
          text_data,
          title: 'comment'
        });
        break;
      }
    }
  }

  submitReport = () => {
    this.setState({ reporting: true });
    // Send the report here
    this.props
      .createReport(this.type, this.id, this.state.description)
      .then(err => {
        if (!err) {
          Alert.alert(
            'Thank you',
            'Your reported has been submitted successfully and will be reviewed'
          );
          this.props.navigation.goBack();
        } else {
          this.setState({ reporting: false });
          Alert.alert(
            'Error',
            'We were unable to submit that report. Please try again later'
          );
        }
      });
  };

  render() {
    // This is varied between iOS and Android. iOS displays the picker
    // without any wrapping element, so we include our Collapsible
    // component as a wrapping element.
    const PickerWrapper = Platform.select({
      ios: props => (
        <Collapsible title={this.state.description} collapsed={true}>
          {props.children}
        </Collapsible>
      ),
      android: props => <View>{props.children}</View>
    });

    return (
      <View style={styles.container}>
        <LoadingOverlay loading={this.state.reporting} />
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.header}>Report {this.state.title}</Text>
          <View style={styles.report_info}>
            {this.state.image && (
              <Image style={styles.image} source={{ uri: this.state.image }} />
            )}
            <View style={styles.text_data}>
              <Text style={styles.name}>{this.state.name}</Text>
              {this.state.text_data && (
                <Text>"{shorten(this.state.text_data, 104)}"</Text>
              )}
            </View>
          </View>
          <Text style={styles.header2}>
            Why are you reporting this {this.state.title}?
          </Text>
          <Text style={styles.sublabel}>SELECT A REASON</Text>
          <View style={styles.picker_container}>
            <PickerWrapper>
              <Picker
                selectedValue={this.state.description}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ description: itemValue })
                }
              >
                {this.REPORT_REASONS.map((reason, index) => (
                  <Picker.Item key={index} label={reason} value={reason} />
                ))}
              </Picker>
            </PickerWrapper>
          </View>
          <TouchableOpacity
            onPress={this.submitReport}
            disabled={!this.state.description}
            style={
              !this.state.description
                ? {
                    ...styles.report_button,
                    backgroundColor: 'gray',
                    shadowOpacity: 0
                  }
                : styles.report_button
            }
          >
            <Text style={styles.button_label}>Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign,
  selectedProfile: state.selectedProfile
});

export default connect(mapStateToProps, { createReport })(CreateReportScreen);
