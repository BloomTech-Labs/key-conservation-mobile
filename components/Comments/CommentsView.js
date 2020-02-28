import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import { commentOnCampaign, getCampaign } from '../../store/actions';
import Comment from './Comment';

import styles from '../../constants/Comments/Comments';
import ActiveComment from '../../assets/jsicons/Comments/ActiveComment';
import InactiveComment from '../../assets/jsicons/Comments/InactiveComment';

class CommentsView extends React.Component {
  state = {
    comment: '',
    posted: false,
    commentsVisible: 3,
    err: '',
    allComments: []
  };

  addMoreComments = () => {
    this.setState({
      ...this.state,
      commentsVisible: this.state.commentsVisible + 9
    });
  };

  render() {
    return (
      <KeyboardAvoidingView>
        {/* Displays latest comment unless the user is viewing all the campaign comments. */}
        {this.props.campaignComments?.length > this.state.commentsVisible && (
          <View style={styles.moreContainer}>
            <TouchableOpacity onPress={() => this.addMoreComments()}>
              <View style={styles.more}>
                <Text style={styles.moreText}>View More Comments</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          {this.props.campaignComments
            ?.slice(0, this.state.commentsVisible)
            .map(comment => {
              return (
                <Comment
                  key={comment.comment_id}
                  comment={comment}
                  currentUserProfile={this.props.currentUserProfile}
                  selectedCampaign={this.props.selectedCampaign}
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
              onChangeText={text => this.setState({ comment: text })}
              style={styles.input}
              value={this.state.comment}
              textAlignVertical={'center'}
              onSubmitEditing={() => {
                this.setState({ comment: '' });
                this.props.commentOnCampaign(
                  this.props.selectedCampaign.camp_id,
                  this.state.comment.trim()
                );
              }}
              blurOnSubmit={Platform.OS === 'android'}
              ref={input => {
                this.commentInput = input;
              }}
              returnKeyType='next'
            />
            {this.state.comment === null || this.state.comment === '' ? (
              <TouchableOpacity style={styles.commentButton}>
                <InactiveComment />
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
                <ActiveComment />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign,
  campaignComments: state.selectedCampaign.comments
});

export default connect(mapStateToProps, {
  commentOnCampaign,
  getCampaign
})(CommentsView);
