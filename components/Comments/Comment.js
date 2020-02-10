import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { getProfileData } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { withNavigation } from 'react-navigation';
import styles from '../../constants/Comments/Comments';
import Ellipse from '../../assets/jsicons/Ellipse';
import CommentActionSheet from '../Reports/CommentActionSheet';

// {
//   navigation,
//   comment,
//   currentUserProfile,
//   selectedCampaign,
//   deleteComment
// }

const Comment = props => {
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const actionSheetRef = useRef(null);

  const createdAt = props.comment.created_at;
  const currentTime = moment();
  const postTime = moment(createdAt);
  let timeDiff;
  if (currentTime.diff(postTime, 'days') < 1) {
    if (currentTime.diff(postTime, 'hours') < 1) {
      if (currentTime.diff(postTime, 'minutes') < 1) {
        timeDiff = 'just now';
      } else {
        if (currentTime.diff(postTime, 'minutes') === 1) {
          timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTE AGO`;
        } else {
          timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTES AGO`;
        }
      }
    } else {
      if (currentTime.diff(postTime, 'hours') === 1) {
        timeDiff = `${currentTime.diff(postTime, 'hours')} HOUR AGO`;
      } else {
        timeDiff = `${currentTime.diff(postTime, 'hours')} HOURS AGO`;
      }
    }
  } else {
    if (currentTime.diff(postTime, 'days') === 1) {
      timeDiff = `${currentTime.diff(postTime, 'days')} DAY AGO`;
    } else {
      timeDiff = `${currentTime.diff(postTime, 'days')} DAYS AGO`;
    }
  }

  // childDelete = id => {
  //   setDeleted(true);
  //   setConfirm(false);
  //   props.deleteComment(id);
  // };

  const goToCommenterProfile = async () => {
    await dispatch(getProfileData(props.comment.users_id));
    props.navigation.navigate('SupPro', {
      username: props.comment.username
    });
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  return (
    <View style={styles.commentWrapper}>
      {deleted === false ? (
        <View>
          <CommentActionSheet
            admin={props.admin}
            commentId={props.comment.comment_id}
            ref={actionSheetRef}
            camp={props.selectedCampaign}
          />
          <View style={styles.commentView}>
            <View style={styles.avatar}>
              {props.comment.users_id === props.selectedCampaign.users_id ? (
                <Avatar
                  onPress={goToCommenterProfile}
                  rounded
                  containerStyle={{ borderWidth: 1, borderColor: '#00FF9D' }}
                  source={{
                    uri: props.comment.profile_image
                  }}
                />
              ) : (
                <Avatar
                  onPress={goToCommenterProfile}
                  rounded
                  source={{
                    uri: props.comment.profile_image
                  }}
                />
              )}
            </View>
            <View style={styles.commentBody}>
              <Text style={styles.username}>{props.comment.username}</Text>
              <Text>{props.comment.comment_body}</Text>
            </View>
            <TouchableOpacity
              onPress={showActionSheet}
              style={styles.commentOptions}
            >
              <Ellipse fill='#000' />
            </TouchableOpacity>
          </View>
          <View style={styles.interaction}>
            <Text style={styles.timeText}>{timeDiff}</Text>
            {/* {props.currentUserProfile.id === props.comment.users_id ? (
              confirm === false && deleted === false ? (
                <Text
                  style={styles.deleteText}
                  onPress={() => setConfirm(true)}
                >
                  Delete
                </Text>
              ) : null
            ) : null} */}
            {confirm === true ? (
              <View style={styles.confirmation}>
                <Text style={styles.confirmText}>Are you sure?</Text>
                <Text
                  style={styles.confirmText}
                  onPress={() => childDelete(props.comment.comment_id)}
                >
                  Yes
                </Text>
                <Text style={styles.confirmText}>/</Text>
                <Text
                  style={styles.confirmNo}
                  onPress={() => setConfirm(false)}
                >
                  No
                </Text>
              </View>
            ) : null}
            {deleted === true ? (
              <View style={styles.confirmation}>
                <Text style={styles.confirmText}>Deleted</Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = state => ({
  admin: state.currentUserProfile.admin
});

export default connect(mapStateToProps, { getProfileData })(
  withNavigation(Comment)
);
