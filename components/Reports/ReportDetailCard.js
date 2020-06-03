//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';

import styles from '../../constants/Reports/ReportDetailCard';

import Collapsible from '../Collapsible';

import moment from 'moment';

import FlagIcon from '../../assets/jsicons/reports/FlagIcon';
import { connect } from 'react-redux';

import { shorten } from '../../util';

import {
  getCustomById,
  deleteComment,
  deleteCampaignPost,
  clearReportError,
  archiveReport,
  getProfileData,
  getReports,
} from '../../store/actions';
import LoadingOverlay from '../LoadingOverlay';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// create a component
class ReportDetailCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postText: '',
      postImage: '',
      isUser: undefined,
    };
  }

  componentWillUnmount() {
    if (this.source) {
      this.source.cancel('User navigated away');
    }
  }

  componentDidMount() {
    const isUser = this.props.currentReport.table_name === 'users';

    this.setState({ isUser });

    if (!isUser) {
      const CancelToken = axios.CancelToken;

      this.source = CancelToken.source();

      this.props
        .getCustomById(
          this.props.currentReport.table_name,
          this.props.currentReport.post_id,
          this.source.token
        )
        .then((res) => {
          if (!res) return;

          switch (this.props.currentReport.table_name) {
            case 'campaign_posts':
              this.type = 'Campaign';
              console.log(res.data.image);
              this.setState({
                postText: res.data.description,
                postImage: res.data.image,
              });
              break;
            case 'comments':
              this.type = 'Comment';
              this.setState({ postText: res.data.body });
              // Image retreieved thru res.data.id
              return this.props.getCustomById(
                'campaign_posts',
                res.data.campaign_id,
                this.source.token
              );
            default: {
              console.warn(
                'invalid table name found in ReportDetailCard.componentDidMount()'
              );
            }
          }
        })
        .then((campaign) => {
          if (campaign?.data) {
            this.setState({ postImage: campaign.data.image });
          }
        })
        .catch((err) => {
          Alert.alert('An error ocurred when we tried to get some data');
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
      case 'campaign_posts': {
        del = this.props.deleteCampaignPost;
        break;
      }
    }

    del(this.props.currentReport.post_id)
      .then((err) => {
        console.log('delete', err);
        if (err) throw new Error(err || '');
      })
      .then(() => {
        this.props.getReports();
        this.props.navigation.goBack(null);
      })
      .catch((error) => {
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
        { text: 'Delete Post', style: 'destructive', onPress: this.deletePost },
      ]
    );
  };

  archiveReport = () => {
    this.props.archiveReport(this.props.currentReport.id).then(() => {
      this.props.getReports();
      this.props.navigation.goBack();
    });
  };

  promptArchiveReport = () => {
    Alert.alert(
      `Archive Report`,
      `Are you sure you want to archive this report? It may still be viewed in the Archived reports tab`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Archive', style: 'default', onPress: this.archiveReport },
      ]
    );
  };

  goToPost = () => {
    // TODO: Implement a way to view the post (comment or campaign)
  };

  render() {
    const timestamp = `Reported on ${moment(
      this.props.currentReport.reported_at
    ).format('lll')}`;

    const loading = !this.state.isUser && !this.state.postText;

    return (
      <Collapsible
        title={`${this.type || '---'} #${
          this.props.currentReport.post_id || '---'
        }`}
        collapsed={this.props.collapsed}
        right={
          <View style={styles.report_count}>
            <FlagIcon style={styles.flag_icon} />
            <Text style={styles.unique_reports}>
              {this.props.unique_reports}
            </Text>
          </View>
        }
      >
        <LoadingOverlay loading={loading} />
        <View style={styles.report_details}>
          {this.state.isUser ? null : (
            <TouchableWithoutFeedback
              onPress={this.goToPost}
              style={styles.post_preview}
            >
              <View style={styles.image_content_container}>
                <Image
                  style={styles.image_content}
                  source={{ uri: this.state.postImage || undefined }}
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
                {this.props.currentReport.description || '---'}
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
                  {this.props.currentReport.reported_by.name}
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

const mapStateToProps = (state) => ({
  reportError: state.reports.error,
});

//make this component available to the app
export default connect(mapStateToProps, {
  getCustomById,
  deleteComment,
  deleteCampaignPost,
  clearReportError,
  archiveReport,
  getProfileData,
  getReports,
})(ReportDetailCard);
