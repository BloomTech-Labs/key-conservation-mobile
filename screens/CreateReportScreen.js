//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Picker,
  Alert
} from 'react-native';

import BackButton from '../components/BackButton';
import Collapsible from '../components/Collapsible';
import LoadingOverlay from '../components/LoadingOverlay';

import { connect } from 'react-redux';

import { createReport } from '../store/actions';

import { shorten } from '../util';
import { TouchableOpacity } from 'react-native-gesture-handler';

// create a component
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
      username: null,
      report_desc: null,
      reporting: false
    };

    this.id = this.props.navigation.getParam('id');
    this.type = this.props.navigation.getParam('type');

    this.REPORT_REASONS = [
      `It an attempt at scam`,
      `It's inappropriate/offensive`,
      `It's spam`,
      `Other`
    ];
  }

  componentDidMount() {
    switch (this.type) {
      case 'users': {
        const { profile_image: image, username } = this.props.selectedProfile;
        this.setState({
          image,
          username,
          title: 'user'
        });
        break;
      }
      case 'campaigns': {
        const {
          profile_image: image,
          username,
          camp_desc: text_data
        } = this.props.selectedCampaign;
        this.setState({
          image,
          username,
          text_data,
          title: 'campaign'
        });
        break;
      }
      case 'campaignUpdates': {
        const {
          profile_image: image,
          username,
          update_desc: text_data
        } = this.props.selectedCampaign;
        this.setState({
          image,
          username,
          text_data,
          title: 'campaign'
        });
        break;
      }
      case 'comments': {
        const {
          profile_image: image,
          comment_body: text_data,
          username
        } = this.props.selectedCampaign.comments.find(
          com => (com.comment_id = this.props.navigation.getParam('id'))
        );
        this.setState({
          image,
          username,
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
      .createReport(this.type, this.id, this.state.report_desc)
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
              <Text style={styles.username}>{this.state.username}</Text>
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
            <Collapsible title={this.state.report_desc}>
              <Picker
                selectedValue={this.state.report_desc}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ report_desc: itemValue })
                }
              >
                {this.REPORT_REASONS.map((reason, index) => (
                  <Picker.Item key={index} label={reason} value={reason} />
                ))}
              </Picker>
            </Collapsible>
          </View>
          <TouchableOpacity
            onPress={this.submitReport}
            disabled={!this.state.report_desc}
            style={
              !this.state.report_desc
                ? { ...styles.report_button, backgroundColor: 'gray' }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 32
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 28
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'gray',
    marginRight: 16
  },
  report_info: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 32
  },
  text_data: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold'
  },
  sublabel: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 12
  },
  picker_container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 8,
    borderColor: 'gray'
  },
  report_button: {
    backgroundColor: '#00FF9D',
    padding: 12,
    borderRadius: 6
  },
  button_label: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign,
  selectedProfile: state.selectedProfile
});

export default connect(mapStateToProps, { createReport })(CreateReportScreen);
