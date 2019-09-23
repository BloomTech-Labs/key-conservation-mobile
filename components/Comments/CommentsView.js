import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { commentOnCampaign, deleteComment } from '../../store/actions';
import styles from '../../constants/Comments/Comments';
import Comment from './Comment';

const testing = [
  {
    comment_id: 1,
    comment_body: 'Testingtestingtesting'
  }
];

const seturl = 'https://key-conservation-staging.herokuapp.com/api/';

class CommentsView extends React.Component {
  state = {
    comment: '',
    campaignComments: [],
    token: '',
    commentsVisible: 5
  };

  addMoreCampaigns = () => {
    this.setState({
      commentsVisible: this.state.commentsVisible + 5
    });
  };
  // componentDidMount = () => {
  // SecureStore.getItemAsync('accessToken').then(async token => {
  //   this.setState({
  //     ...this.state,
  //     token: token
  //   });
  // });
  // };

  // componentDidUpdate(prevState) {
  //   if (prevState.selectedComments !== this.state.selectedComments) {
  //     console.log('HUUH?');
  //   }
  // }

  // makeComment = () => {
  //   console.log('Step 11');
  //   axios
  //     .post(
  //       `${seturl}comments/${this.props.selectedCampaign.camp_id}`,
  //       {
  //         users_id: this.props.currentUserProfile.id,
  //         comment_body: this.state.comment
  //       },
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: `Bearer ${this.state.token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //     .then(res => {
  //       console.log('My data is UP IN HUR---->', res.data.data.camp_id);
  //       this.setState({
  //         ...this.state,
  //         campaignComments: res.data.data.comments
  //       });
  //     })
  //     .catch(err => {
  //       // console.lor("Here's my error =====>", err);
  //       // dispatch({ type: POST_COMMENT_ERROR, payload: err });
  //     });
  // };

  makeCommentAction = () => {
    this.props.commentOnCampaign(this.props.selectedCampaign.camp_id, {
      comment_body: this.state.comment,
      users_id: this.props.currentUserProfile.id
    });
  };

  render() {
    console.log('Mmkay');
    return (
      <KeyboardAvoidingView
        behavior='height'
        enabled
        keyboardVerticalOffset={20}
      >
        <ScrollView>
          <View>
            {/* {this.props.selectedCampaign.comments.length > 0 &&
              this.props.selectedCampaign.comments
                .slice(0, this.state.commentsVisible)
                .map(comment => {
                  <Comment comment={comment} key={comment.comment_id} />;
                })} */}
            <FlatList
              data={this.props.selectedCampaign.comments}
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
          <View style={styles.replyView}>
            <Avatar
              rounded
              source={{
                uri: this.props.currentUserProfile.profile_image
              }}
            />
            <TextInput
              placeholder='Join the conversation...'
              onChangeText={text => this.setState({ comment: text })}
              multiline={true}
              style={styles.inputContain}
              value={this.state.comment}
            />
            <TouchableOpacity onPress={() => this.makeCommentAction()}>
              <Text>PRESS ME MAYBE PLEASE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign
});

export default connect(
  mapStateToProps,
  { commentOnCampaign, deleteComment }
)(CommentsView);
