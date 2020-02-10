import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from 'react-native';
import moment from 'moment';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import SvgUri from 'react-native-svg-uri';

import {
  commentOnCampaign,
  deleteComment,
  getCampaign
} from '../../store/actions';
import Comment from './Comment';

import styles from '../../constants/Comments/Comments';

// url for heroku staging vs production server
// production
const seturl = 'https://key-conservation.herokuapp.com/api/';
// staging
// const seturl = 'https://key-conservation-staging.herokuapp.com/api/';

// If you check out the actions and reducer, you'll see we have a commentOnCampaign action. Despite that, we simply could not trigger a re-render and decided to use
// axios calls in the component itself. We presume this issue has something to do with the ansychronous nature of what's happening, but...
// We eventually settled on using componentDidUpdate to get what we want, but it ain't pretty.

class CommentsView extends React.Component {
  state = {
    comment: '',
    latestComment: '',
    posted: false,
    campaignComments: [],
    commentsVisible: 3,
    err: ''
  };

  render() {
    console.log('selectedcampaign', this.props.selectedCampaign);

    return (
      <KeyboardAvoidingView>
        {/* Displays latest comment unless the user is viewing all the campaign comments. */}
        {this.props.selectedCampaign.comments?.length >
          Math.abs(this.state.commentsVisible) && (
          <View style={styles.moreContainer}>
            <TouchableOpacity onPress={() => this.addMoreComments()}>
              <View style={styles.more}>
                <Text style={styles.moreText}>View More Comments</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {/*comment sort order needs to be fixed*/}
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          {this.props.selectedCampaign.comments
            .sort((a, b) => {
              return b.created_at - a.created_at;
            })
            .slice(0, this.state.commentsVisible)
            .map(comment => {
              return (
                <Comment
                  key={comment.comment_id}
                  comment={comment}
                  currentUserProfile={this.props.currentUserProfile}
                  selectedCampaign={this.props.selectedCampaign}
                  deleteComment={this.deleteComment}
                  token={this.props.token}
                />
              );
            })}
        </View>
        {/* View More Comments is visible if the length of campaignComments is greater than the value of commentsVisible */}
        <View style={styles.replyView}>
          <View style={styles.replyAvatar}>
            <Avatar
              rounded
              source={{
                uri: this.props.currentUserProfile.profile_image
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Be a part of the conversation...'
              onChangeText={text =>
                this.setState({ comment: text, latestComment: text })
              }
              style={styles.input}
              value={this.state.comment}
              textAlignVertical={'center'}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.usernameInput.focus();
              }}
              blurOnSubmit={Platform.OS === 'android'}
              ref={input => {
                this.commentInput = input;
              }}
              returnKeyType='next'
            />
            {this.state.comment === null || this.state.comment === '' ? (
              <TouchableOpacity style={styles.commentButton}>
                <SvgUri
                  width='26'
                  height='26'
                  source={require('../../assets/icons/inactive_comment.svg')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => {
                  this.setState({ comment: '' });
                  this.props.commentOnCampaign(
                    this.props.selectedCampaign.camp_id,
                    this.state.comment.trim()
                  );
                }}
              >
                <SvgUri
                  width='26'
                  height='26'
                  source={require('../../assets/icons/active_comment.svg')}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // makeComment = () => {
  //   if (this.state.comment.length > 0) {
  //     axios
  //       .post(
  //         `${seturl}comments/${this.props.selectedCampaign.camp_id}`,
  //         {
  //           users_id: this.props.currentUserProfile.id,
  //           comment_body: this.state.comment.trim()
  //         },
  //         {
  //           headers: {
  //             Accept: 'application/json',
  //             Authorization: `Bearer ${this.props.token}`,
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       )
  //       .then(res => {
  //         const comments = res.data.data.sort(function(a, b) {
  //           return moment(a.created_at) - moment(b.created_at);
  //         });
  //         this.setState({
  //           ...this.state,
  //           campaignComments: comments,
  //           comment: '',
  //           posted: true
  //         });
  //       })
  //       .catch(err => {
  //         this.setState({
  //           ...this.state,
  //           err: err
  //         });
  //       });
  //   }
  // };

  // deleteComment = id => {
  //   axios
  //     .delete(`${seturl}comments/com/${id}`, {
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${this.props.token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(res => {
  //       const filteredCampaigns = this.state.campaignComments.filter(
  //         c => c.comment_id !== res.data.data
  //       );
  //       this.setState({
  //         ...this.state,
  //         campaignComments: filteredCampaigns
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({
  //         ...this.state,
  //         err: err
  //       });
  //     });
  // };

  // Currently deletComment won't trigger a rerender

  addMoreComments = () => {
    this.setState({
      ...this.state,
      commentsVisible: this.state.commentsVisible + 9
    });
  };
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign,
  token: state.token
});

export default connect(mapStateToProps, {
  commentOnCampaign,
  deleteComment,
  getCampaign
})(CommentsView);
