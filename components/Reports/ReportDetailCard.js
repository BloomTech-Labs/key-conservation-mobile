//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import Collapsible from '../Collapsible';

import moment from 'moment';

import flag from '../../assets/icons/flag-alt-solid.svg';

import { connect } from 'react-redux';

import { getCustomById, getCampaign } from '../../store/actions';
import SvgUri from 'react-native-svg-uri';

// create a component
class ReportDetailCard extends Component {
  constructor(props) {
    super(props);

    this.isUser = props.currentReport.table_name === 'users';

    this.state = {
      postText: '',
      postImage: ''
    };
  }

  componentDidMount() {
    if (!this.isUser) {
      this.props
        .getCustomById(
          this.props.currentReport.table_name,
          this.props.currentReport.post_id
        )
        .then(res => {
          switch (this.props.currentReport.table_name) {
            case 'campaigns':
              this.type = 'Campaign';
              this.setState({ postText: res.data.camp.camp_desc });
              this.setState({ postImage: res.data.camp.camp_img });
              break;
            case 'campaignUpdates':
              this.type = 'Campaign';
              this.setState({ postText: res.data.campUpdate.update_desc });
              this.setState({ postImage: res.data.campUpdate.update_img });
              break;
            case 'comments':
              this.type = 'Comment';
              this.setState({ postText: res.data.comment_body });
              // Image retreieved thru res.data.camp_id
              return this.props.getCustomById('campaigns', res.data.camp_id);
            default: {
              console.warn(
                'invalid table name found in ReportDetailCard.componentDidMount()'
              );
            }
          }
        })
        .then(campaign => {
          if (campaign?.data) {
            this.setState({ postImage: campaign.data.camp.camp_img });
          }
        })
        .catch(err => {
          console.log(err.message);
          Alert.alert(
            err.message || 'An error ocurred when we tried to get some data'
          );
        });
    } else this.type = 'User Profile';
  }

  render() {
    const timestamp = `Reported on ${moment(
      this.props.currentReport.reported_at
    ).format('lll')}`;

    const loading =
      !this.isUser && !(this.state.postText && this.state.postImage);

    return (
      <Collapsible
        title={`${this.type || '---'} #${this.props.currentReport.post_id ||
          '---'}`}
        collapsed={this.props.collapsed}
        right={
          <View style={styles.report_count}>
            <SvgUri
              style={styles.flag_icon}
              source={flag}
              fill='#000000'
              width='15'
              height='100%'
            />
            <Text style={styles.unique_reports}>
              {this.props.unique_reports}
            </Text>
          </View>
        }
      >
        {loading && (
          <View style={styles.load_overlay}>
            <Text style={styles.load_text}>Loading...</Text>
          </View>
        )}
        <View style={styles.report_details}>
          {this.isUser ? null : (
            <View style={styles.post_preview}>
              <View style={styles.image_content_container}>
                <Image
                  style={styles.image_content}
                  source={loading ? null : { uri: this.state.postImage }}
                />
              </View>
              <Text style={styles.text_content}>{this.state.postText}</Text>
            </View>
          )}
          <View style={styles.detail_section}>
            <Text style={styles.mini_header}>REPORT DETAILS</Text>
            <View style={styles.detail_field}>
              <Text style={styles.text_label}>Description</Text>
              <Text style={styles.text_label}>
                {this.props.currentReport.report_desc || '---'}
              </Text>
            </View>
            <View style={styles.detail_field}>
              <Text style={styles.text_label}>Reported By</Text>
              <TouchableOpacity style={styles.touch_op}>
                <Text style={styles.user_link}>User</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.timestamp}>{timestamp || '---'}</Text>
          </View>
        </View>
      </Collapsible>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  load_overlay: {
    position: 'absolute',
    zIndex: 50,
    backgroundColor: 'black',
    opacity: 0.6,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  load_text: {
    fontWeight: 'bold',
    color: 'white'
  },
  report_details: {},
  post_preview: {
    borderBottomWidth: 1,
    marginBottom: 8,
    padding: 8,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detail_section: {},
  mini_header: {
    color: 'gray',
    fontSize: 11
  },
  detail_field: {
    flexDirection: 'row',
    padding: 8
  },
  text_label: {
    flex: 1
  },
  user_link: {
    fontWeight: 'bold',
    color: 'dodgerblue'
  },
  touch_op: {
    flex: 1
  },
  timestamp: {
    flex: 1,
    color: 'gray',
    textAlign: 'right',
    paddingVertical: 3
  },
  text_content: {
    flex: 1,
    fontWeight: 'bold'
  },
  image_content_container: {
    marginRight: 16,
    width: 70,
    height: 70
  },
  image_content: {
    backgroundColor: 'gray',
    width: null,
    height: null,
    flex: 1
  },
  report_count: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  flag_icon: {
    marginRight: 2
  },
  unique_reports: {
    fontWeight: 'bold',
    marginHorizontal: 6
  }
});

//make this component available to the app
export default connect(null, { getCustomById, getCampaign })(ReportDetailCard);
