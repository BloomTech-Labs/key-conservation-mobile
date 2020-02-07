//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';

import styles from '../../constants/Reports/ReportDetailCard';

import Collapsable from '../Collapsable';

import moment from 'moment';

import flag from '../../assets/icons/flag-alt-solid.svg';

import { connect } from 'react-redux';

import { getCustomById, getCampaign } from '../../store/actions';
import SvgUri from 'react-native-svg-uri';
import LoadingOverlay from '../LoadingOverlay';

// create a component
class ReportDetailCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postText: '',
      postImage: '',
      isUser: undefined
    };
  }

  componentDidMount() {
    const isUser = this.props.currentReport.table_name === 'users';

    this.setState({ isUser });

    if (!isUser) {
      console.log(`
      =====================
      this.props.getCustomById: ${this.props.getCustomById}
      this.props.currentReport: ${this.props.currentReport}
      `)
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
      !this.state.isUser && !(this.state.postText && this.state.postImage);

    return (
      <Collapsable
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
        <LoadingOverlay loading={loading} />
        <View style={styles.report_details}>
          {this.state.isUser ? null : (
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
      </Collapsable>
    );
  }
}

//make this component available to the app
export default connect(null, { getCustomById, getCampaign })(ReportDetailCard);
