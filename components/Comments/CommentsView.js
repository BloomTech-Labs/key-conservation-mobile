import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import {
  commentOnCampaign,
  deleteComment,
  getCampaign
} from '../../store/actions';
import styles from '../../constants/Comments/Comments';
import Comment from './Comment';

const seturl = 'https://key-conservation-staging.herokuapp.com/api/';
const id = 50;

class CommentsView extends React.Component {
  state = {
    comment: '',
    campaignComments: [],
    token: '',
    commentsVisible: 3,
    err: '',
    boolean: false,
    hi: 'Hi'
  };

  componentDidMount = () => {
    console.log('first stop on the pain train', this.props.myTest.camp_name);
    SecureStore.getItemAsync('accessToken').then(async token => {
      console.log('ALMOST');
      if (this.state.token.length === 0) {
        this.setState({
          ...this.state,
          token: token
        });
      }
    });
  };

  componentDidUpdate = prevState => {
    if (prevState.token !== this.state.token) {
      this.getComments();
      console.log(
        'CHeck this out ---------->',
        this.props.selectedCampaign.camp_name
      );
    }
  };

  render() {
    // console.log(this.state);
    console.log('WOOORK');
    if (
      this.state.campaignComments.length === 0 &&
      this.state.boolean === true
      // this.props.selectedCampaign.comments.length > 0
    ) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color='#00FF9D' />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        behavior='height'
        enabled
        keyboardVerticalOffset={20}
      >
        <ScrollView>
          <View>
            {/* {this.state.campaignComments.map(comment => (
              <Comment
                comment={comment}
                key={comment.comment_id}
                currentUserProfile={this.props.currentUserProfile}
                selectedCampaign={this.props.selectedCampaign}
                deleteComment={this.props.deleteComment}
              />;
            )}} */}
            {/* {this.state.campaignComments.length > 0 &&
              this.state.campaignComments
                .slice(0, this.state.commentsVisible)
                .map(comment => {
                  <Comment
                    comment={comment}
                    key={comment.comment_id}
                    currentUserProfile={this.props.currentUserProfile}
                    selectedCampaign={this.props.selectedCampaign}
                    deleteComment={this.props.deleteComment}
                  />;
                })} */}
            <FlatList
              data={this.state.campaignComments.slice(
                0,
                this.state.commentsVisible
              )}
              keyExtractor={comment => comment.comment_id}
              renderItem={({ item }) => {
                return (
                  <Comment
                    comment={item}
                    currentUserProfile={this.props.currentUserProfile}
                    selectedCampaign={this.props.selectedCampaign}
                    deleteComment={this.props.deleteComment}
                  />
                );
              }}
            />
          </View>
          {this.state.campaignComments.length > this.state.commentsVisible && (
            <View style={styles.moreContainer}>
              <TouchableOpacity onPress={() => this.addMoreComments()}>
                <View style={styles.more}>
                  <Text style={styles.moreText}>View More Comments</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
                multiline={true}
                style={styles.input}
                value={this.state.comment}
                textAlignVertical={'center'}
              />
              <TouchableOpacity onPress={() => this.makeComment()}>
                <FontAwesome name='paper-plane' style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  getComments = () => {
    axios
      .get(`${seturl}comments/${this.props.selectedCampaign.camp_id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // console.log(res.data.data, "What's up!");
        this.setState({
          ...this.state,
          campaignComments: res.data.data
        });
      })
      .catch(err => {
        console.log('errrrrr', err);
        this.setState({
          ...this.state,
          err: err
        });
      });
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.value !== this.props.value) {
  //     this.setState({ value: this.props.value });
  //   }
  // }

  // Attempts to provoke rerenders with changes  ^^^^

  makeComment = () => {
    console.log('Step 11');
    axios
      .post(
        `${seturl}comments/${this.props.selectedCampaign.camp_id}`,
        {
          users_id: this.props.currentUserProfile.id,
          comment_body: this.state.comment
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.state.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        // console.log('My data is UP IN HUR---->', res.data.data);
        this.setState({
          ...this.state,
          campaignComments: res.data.data
        });
      })
      .catch(err => {
        // console.lor("Here's my error =====>", err);
        // dispatch({ type: POST_COMMENT_ERROR, payload: err });
      });
  };

  // makeCommentAction = () => {
  //   this.props.commentOnCampaign(this.props.selectedCampaign.camp_id, {
  //     comment_body: this.state.comment,
  //     users_id: this.props.currentUserProfile.id
  //   });
  //   this.setState({
  //     ...this.state,
  //     boolean: !this.state.boolean
  //   });
  // };

  handleClick = () => {
    this.props.commentOnCampaign(this.props.selectedCampaign.camp_id, {
      comment_body: this.state.comment,
      users_id: this.props.currentUserProfile.id
    });
  };

  addMoreComments = () => {
    this.setState({
      ...this.state,
      commentsVisible: this.state.commentsVisible + 9
    });
  };
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.SC !== this.props.SC) {
  //     this.setState({ SC: this.props.SC });
  //   }
  // }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign
});

export default connect(
  mapStateToProps,
  { commentOnCampaign, deleteComment, getCampaign }
)(CommentsView);
