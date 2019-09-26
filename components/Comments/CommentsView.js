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

class CommentsView extends React.Component {
  state = {
    comment: '',
    campaignComments: [],
    token: '',
    commentsVisible: 3,
    err: '',
    comparison: ''
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.selectedCampaign.comments !==
      prevProps.selectedCampaign.comments
    ) {
      this.setState({
        campaignComments: this.props.selectedCampaign.comments,
        comparison: this.props.selectedCampaign.comments.length
      });
    }
  };

  // Currently redux store changes are not triggering re-renders. Multiple devs have looked into why we need this componentDidUpdate despite having the redux store hooked up to our component. No solutions yet.

  render() {
    if (
      this.state.campaignComments.length === 0 &&
      this.state.boolean === true
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
                    deleteComment={this.deleteComment}
                    token={this.props.token}
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

  makeComment = () => {
    if (this.state.comment.length > 0) {
      axios
        .post(
          `${seturl}comments/${this.props.selectedCampaign.camp_id}`,
          {
            users_id: this.props.currentUserProfile.id,
            comment_body: this.state.comment.trim()
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${this.props.token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        .then(res => {
          this.setState({
            ...this.state,
            campaignComments: res.data.data,
            comment: ''
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            ...this.state,
            err: err
          });
        });
    }
  };

  deleteComment = id => {
    axios
      .delete(`${seturl}comments/com/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.props.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res.data.data, 'deleteltletletletl');
        this.setState({
          ...this.state,
          campaignComments: this.state.campaignComments.filter(
            c => c.comment_id !== res.data.data
          )
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          err: err
        });
      });
  };

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

export default connect(
  mapStateToProps,
  { commentOnCampaign, deleteComment, getCampaign }
)(CommentsView);
