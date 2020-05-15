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
  };

  bufferedComment = null;

  componentDidMount() {
    this.props.getCampaignComments(this.props.selectedCampaign.campaign_id);
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
    return (
      <KeyboardAvoidingView>
        {/* Displays latest comment unless the user is viewing all the campaign comments. */}
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          {[this.bufferedComment, ...this.props.campaignComments]
            ?.filter((com) => com !== null)
            .slice(0, this.state.commentsVisible)
            .map((comment, index) => {
              return (
                <Comment
                  key={index}
                  comment={comment}
                  currentUserProfile={this.props.currentUserProfile}
                  selectedCampaign={this.props.selectedCampaign}
                />
              );
            })}
        </View>
        {this.props.campaignComments?.length > this.state.commentsVisible && (
          <View style={styles.moreContainer}>
            <TouchableOpacity onPress={() => this.addMoreComments()}>
              <View style={styles.more}>
                <Text style={styles.moreText}>View more comments</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
              blurOnSubmit={Platform.OS === 'android'}
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
  campaignComments: state.selectedCampaign.comments || [],
});

export default connect(mapStateToProps, {
  commentOnCampaign,
  getCampaignComments,
})(CommentsView);
