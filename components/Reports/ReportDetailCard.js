//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';

import { AmpEvent } from '../withAmplitude';

import styles from '../../constants/Reports/ReportDetailCard';

import Collapsible from '../Collapsible';

import moment from 'moment';

import flag from '../../assets/icons/flag-alt-solid.svg';

import { connect } from 'react-redux';

import { shorten } from '../../util';

import {
  getCustomById,
  getCampaign,
  deleteComment,
  deleteCampaign,
  deleteCampaignUpdate,
  clearReportError,
  archiveReport,
  getProfileData
} from '../../store/actions';
import SvgUri from 'react-native-svg-uri';
import LoadingOverlay from '../LoadingOverlay';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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

  deletePost = () => {
    // Delete this post
    let del;

    switch (this.props.currentReport.table_name) {
      case 'comments': {
        del = this.props.deleteComment;
        break;
      }
      case 'campaigns': {
        del = this.props.deleteCampaign;
        break;
      }
      case 'campaignUpdates': {
        del = this.props.deleteCampaignUpdate;
        break;
      }
    }

    del(this.props.currentReport.post_id)
      .then(err => {
        console.log(err);
        if (err) throw new Error(err || '');
      })
      .then(() => {
        this.props.navigation.goBack(null);
      })
      .catch(error => {
        Alert.alert(
          `Failed to delete ${this.type.toLowerCase()}`,
          error.msg || '',
          [{ text: 'Try Again', onPress: this.deletePost }, { text: 'Dismiss' }]
        );
      });
  };

  promptDeletePost = () => {
    Alert.alert(
      `Delete Post`,
      `Are you sure you want to delete this post? This will add a strike on this user's record and cannot be undone`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete Post', style: 'destructive' }
      ]
    );
  };

  archiveReport = () => {
    this.props.archiveReport(this.props.currentReport.id).then(() => {
      this.props.navigation.goBack('AdminScreen');
    });
  };

  promptArchiveReport = () => {
    Alert.alert(
      `Archive Report`,
      `Are you sure you want to archive this report? It may still be viewed in the Archived reports tab`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Archive', style: 'default' }
      ]
    );
  };

  goToPost = () => {
    // TODO: Implement a way to view the post (comment, campaign or campaign update)
  }

  render() {
    const timestamp = `Reported on ${moment(
      this.props.currentReport.reported_at
    ).format('lll')}`;

    const loading =
      !this.state.isUser && !(this.state.postText && this.state.postImage);

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
        <LoadingOverlay loading={loading} />
        <View style={styles.report_details}>
          {this.state.isUser ? null : (
            <TouchableWithoutFeedback onPress={this.goToPost} style={styles.post_preview}>
              <View style={styles.image_content_container}>
                <Image
                  style={styles.image_content}
                  source={loading ? null : { uri: this.state.postImage }}
                />
              </View>
              <View style={styles.text_content_container}>
                <Text style={styles.text_content}>
                  "{shorten(this.state.postText, 86)}"
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
              <TouchableOpacity
                onPress={this.props.goToProfile.bind(
                  this,
                  this.props.currentReport.reported_by.id
                )}
                style={styles.touch_op}
              >
                <Text style={styles.user_link}>
                  {this.props.currentReport.reported_by.username}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detail_field}>
              <Text style={styles.text_label}>Actions</Text>
              <View style={styles.actions}>
                {!this.props.currentReport.is_archived && (
                  <TouchableOpacity
                    onPress={this.promptArchiveReport}
                    style={styles.action_button_container}
                  >
                    <Text style={styles.action_button}>Archive Report</Text>
                  </TouchableOpacity>
                )}
                {this.props.currentReport.table_name !== 'users' && (
                  <TouchableOpacity
                    onPress={this.promptDeletePost}
                    style={styles.action_button_container}
                  >
                    <Text style={styles.action_button}>Delete Post</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={styles.timestamp}>{timestamp || '---'}</Text>
          </View>
        </View>
      </Collapsible>
    );
  }
}

const mapStateToProps = state => ({
  reportError: state.reports.error
});

//make this component available to the app
export default connect(mapStateToProps, {
  getCustomById,
  getCampaign,
  deleteComment,
  deleteCampaign,
  deleteCampaignUpdate,
  clearReportError,
  archiveReport,
  getProfileData
})(ReportDetailCard);
