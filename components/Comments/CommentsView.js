import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import { commentOnCampaign, getCampaignComments } from '../../store/actions';
import Comment from './Comment';

import styles from '../../constants/Comments/Comments';

class CommentsView extends React.Component {
  state = {
    comment: '',
    commentsVisible: 3,
    height: 40,
    campaign_id: null,
  };

  bufferedComment = null;

  componentDidMount() {
    const campaign_id = this.props.selectedCampaign?.campaign_id;

    if (!this.props.comments) this.props.getCampaignComments(campaign_id);

    this.setState({
      campaign_id: campaign_id,
    });
  }

  componentDidUpdate() {
    this.bufferedComment = null;
  }

  addMoreComments = () => {
    this.setState({
      ...this.state,
      commentsVisible: this.state.commentsVisible + 9,
    });
  };

  postComment = () => {
    this.props.commentOnCampaign(
      this.props.selectedCampaign.campaign_id,
      this.state.comment.trim()
    );

    // Add ghost comment for better user experience
    this.bufferedComment = {
      profile_image: this.props.currentUserProfile.profile_image,
      name: this.props.currentUserProfile.name,
      body: this.state.comment,
    };

    this.setState((prevState) => ({
      comment: '',
      commentsVisible: prevState.commentsVisible + 1,
    }));
  };

  render() {
    const comments = [this.bufferedComment, ...(this.props.comments || [])]
      ?.filter((com) => com !== null)
      .slice(0, this.state.commentsVisible)
      .map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            currentUserProfile={this.props.currentUserProfile}
            selectedCampaign={this.props.selectedCampaign}
          />
        );
      });

    return (
      <KeyboardAvoidingView>
        {/* Displays latest comment unless the user is viewing all the campaign comments. */}
        {this.props.comments?.length > this.state.commentsVisible && (
          <View style={styles.moreContainer}>
            <TouchableOpacity onPress={() => this.addMoreComments()}>
              <Text style={styles.moreText}>View more comments</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          {comments.length > 0 ? (
            comments
          ) : (
            <Text style={styles.commentsEmpty}>No comments yet</Text>
          )}
        </View>
        {/* View More Comments is visible if the length of campaignComments is greater than the value of commentsVisible */}
        <View style={styles.replyView}>
          <View style={styles.replyAvatar}>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: this.props.currentUserProfile.profile_image,
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Write a comment..."
              placeholderTextColor="#3B3B3B"
              onChangeText={(text) => this.setState({ comment: text })}
              style={styles.input}
              value={this.state.comment}
              textAlignVertical={'center'}
              onSubmitEditing={this.postComment}
              blurOnSubmit={true}
              ref={(input) => {
                this.commentInput = input;
              }}
              returnKeyType="send"
              multiline
            />
            {this.state.comment === null || this.state.comment === '' ? (
              <TouchableOpacity>
                <Text style={styles.commentButton}>Post</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.postComment}>
                <Text style={styles.commentButton}>Post</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign
});

export default connect(mapStateToProps, {
  commentOnCampaign,
  getCampaignComments,
})(CommentsView);
