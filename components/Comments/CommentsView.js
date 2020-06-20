import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import { commentOnCampaign, getCampaignComments } from '../../store/actions';
import Comment from './Comment';

import styles from '../../constants/Comments/Comments';

class CommentsView extends React.Component {
  mounted = false;

  state = {
    comments: [],
    comment: '',
    commentsVisible: 3,
    height: 40,
    campaign_id: null,
  };

  bufferedComment = null;

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    const campaign_id = this.props.selectedCampaign?.campaign_id;

    this.setState({
      comments: this.props.comments,
      campaign_id: campaign_id,
    });

    if (campaign_id)
      this.props
        .getCampaignComments(campaign_id)
        .then((res) => {
          if (this.mounted) this.setState({ comments: res?.data?.data || [] });
        })
        .catch((err) => {
          console.log(err);
        });
  }

  componentDidUpdate() {
    this.bufferedComment = null;
  }

  addMoreComments = () => {
    this.setState({
      commentsVisible: this.state.commentsVisible + 9,
    });
  };

  refreshComments = (comments) => {
    if (this.mounted) {
      this.setState({
        comments,
      });
    }
  };

  postComment = () => {
    this.props
      .commentOnCampaign(
        this.props.selectedCampaign.campaign_id,
        this.state.comment.trim()
      )
      .then((comments) => this.refreshComments(comments));

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
    const comments = [
      this.bufferedComment,
      ...(this.state.comments || this.props.comments || []),
    ]
      ?.filter((com) => com !== null)
      .sort((a, b) => new Date(a).getTime() < new Date(b).getTime())
      .slice(0, this.state.commentsVisible)
      .map((comment) => {
        return (
          <Comment
            key={comment.id || 999}
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
              <Text style={styles.moreText}>View more comments...</Text>
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
  selectedCampaign: state.selectedCampaign,
});

export default connect(mapStateToProps, {
  commentOnCampaign,
  getCampaignComments,
})(CommentsView);
