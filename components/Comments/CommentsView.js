import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { ScrollView, NavigationEvents } from "react-navigation";
import { Avatar } from "react-native-elements";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import {
  commentOnCampaign,
  deleteComment,
  getCampaign,
  getProfileData
} from "../../store/actions";
import styles from "../../constants/Comments/Comments";
import Comment from "./Comment";

// url for heroku staging vs production server
const seturl = "https://key-conservation-staging.herokuapp.com/api/";

class CommentsView extends React.Component {
  state = {
    comment: "",
    latestComment: "",
    posted: false,
    campaignComments: [],
    token: "",
    commentsVisible: 3,
    err: "",
    comparison: ""
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

  // Currently redux store changes are not triggering re-renders. Multiple devs have looked into why we need this componentDidUpdate despite having the redux store hooked up to our component. No solutions yet though.

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
      <KeyboardAvoidingView>
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
                    goToProfile={this.goToProfile}
                  />
                );
              }}
            />
          </View>
          {this.state.posted === true &&
          this.state.campaignComments.length > this.state.commentsVisible ? (
            <View>
              <View style={styles.commentView}>
                <View style={styles.avatar}>
                  {this.props.currentUserProfile.users_id ===
                  this.props.selectedCampaign.users_id ? (
                    <Avatar
                      rounded
                      containerStyle={{
                        borderWidth: 1,
                        borderColor: "#00FF9D"
                      }}
                      source={{
                        uri: this.props.currentUserProfile.profile_image
                      }}
                    />
                  ) : (
                    <Avatar
                      rounded
                      source={{
                        uri: this.props.currentUserProfile.profile_image
                      }}
                    />
                  )}
                  {/* Displays latest comment unless the user is viewing all the campaign comments. */}
                </View>
                <View style={styles.commentText}>
                  <Text style={styles.username}>
                    {this.props.currentUserProfile.username}
                  </Text>
                  <Text style={styles.commentBody}>
                    {this.state.latestComment}
                  </Text>
                </View>
              </View>
              <View style={styles.interaction}>
                <Text style={styles.timeText}>just now</Text>
              </View>
            </View>
          ) : null}
          {this.state.campaignComments.length > this.state.commentsVisible && (
            <View style={styles.moreContainer}>
              <TouchableOpacity onPress={() => this.addMoreComments()}>
                <View style={styles.more}>
                  <Text style={styles.moreText}>View More Comments</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
                textAlignVertical={"center"}
                onSubmitEditing={() => {
                  if (Platform.OS === "android") return;
                  this.usernameInput.focus();
                }}
                blurOnSubmit={Platform.OS === "android"}
                ref={input => {
                  this.commentInput = input;
                }}
                returnKeyType='next'
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
              Accept: "application/json",
              Authorization: `Bearer ${this.props.token}`,
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          const comments = res.data.data.sort(function(a, b) {
            return moment(a.created_at) - moment(b.created_at);
          });
          this.setState({
            ...this.state,
            campaignComments: comments,
            comment: "",
            posted: true
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
          Accept: "application/json",
          Authorization: `Bearer ${this.props.token}`,
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        const filteredCampaigns = this.state.campaignComments.filter(
          c => c.comment_id !== res.data.data
        );
        this.setState({
          ...this.state,
          campaignComments: filteredCampaigns
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

  // Currently deletComment won't trigger a rerender

  addMoreComments = () => {
    this.setState({
      ...this.state,
      commentsVisible: this.state.commentsVisible + 9
    });
  };

  // For navigating to commenter's profile

  goToProfile = async (user) => {
    await dispatch(getProfileData(user))
    this.props.navigation.navigate('Pro')
    console.log('?????')
    console.log('goToProfile in comment :', user)
    console.log(this.props.selectedProfile, 'checking dat selected profile')
  }

  testingPress = () => {
    console.log('testing press')
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign,
  token: state.token,
  selectedProfile: state.selectedProfile
});

export default connect(
  mapStateToProps,
  { commentOnCampaign, deleteComment, getCampaign, getProfileData }
)(CommentsView);
