import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { withNavigation } from 'react-navigation';
import styles from '../../constants/Comments/Comments';
import Ellipse from '../../assets/jsicons/Ellipse';
import CommentActionSheet from '../Reports/CommentActionSheet';
import LoadingOverlay from '../LoadingOverlay';

const Comment = props => {

  // This is so that the opacity of the comment will be
  // reduced when it is being deleting, or barely being posted
  // This is for a more streamlined user experience
  const [loading, setLoading] = useState(props.comment.comment_id ? '' : 'Posting...');

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

  const goToCommenterProfile = () => {
    props.navigation.push('Pro', {
      selectedProfile: props.comment.users_id
    });
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  return (
    <View
      pointerEvents={loading ? 'none' : 'auto'}
      style={{
        ...styles.commentWrapper,
        opacity: loading ? 0.32 : 1
      }}
    >
      <View>
        <CommentActionSheet
          onDelete={(failed = false) => setLoading(failed ? '' : 'Deleting...')}
          isMine={props.comment.users_id === props.currentUserProfile.id}
          admin={props.admin}
          commentId={props.comment.comment_id}
          ref={actionSheetRef}
          camp={props.selectedCampaign}
        />
        <View style={styles.commentView}>
          <View style={styles.avatar}>
            <Avatar
              onPress={goToCommenterProfile}
              rounded
              containerStyle={
                props.comment.users_id === props.selectedCampaign.users_id && {
                  borderWidth: 1,
                  borderColor: '#00FF9D'
                }
              }
              source={{
                uri: props.comment.profile_image
              }}
            />
          </View>
          <View style={styles.commentBody}>
            <Text style={styles.name}>{props.comment.name}</Text>
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
          <Text style={styles.timeText}>{loading || timeDiff}</Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile,
  admin: state.currentUserProfile.admin
});

export default connect(mapStateToProps)(withNavigation(Comment));
