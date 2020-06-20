import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, connect } from 'react-redux';
import { AmpEvent } from '../withAmplitude';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import TimeStamp from './TimeStamp';
import { openCampaign } from '../../store/actions';

const CampaignNotification = (props) => {
  // useEffect(() => {

  //     // console.log(props);
  //     // console.log(props.notifData.item.sender_name);
  //     // console.log(props.notifData.item.sender_Pic);

  // });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('@@@@@@@@@', data);
  }, [data]);

  const [data, setData] = useState(props.notifData.item);

  const goToProfile = () => {
    props.nav.push('Pro', {
      selectedProfile: props.notifData.item.sender_id,
    });
  };

  const createdAt = props.notifData.item.time;

  const checkNew = () => {
    console.log('state data', data);
    if ((data.new_notification = true)) {
      return setData({
        ...data,
        new_notification: false,
      });
    }
  };

  const goToCampaign = async () => {
    AmpEvent('Select Profile from Campaign', {
      campaign: props.notifData.item.name,
      profile: props.notifData.item.sender_name,
    });
    // console.log('testme', props.notifData.item);
    dispatch(openCampaign(props.notifData.item));
    navigate('Campaign', {
      userBookmarked: 153,
      postId: props.notifData.item.id,
    });
  };

  return (
    <TouchableOpacity
      style={!data.new_notification ? styles.wrapper : styles.wrapperNew}
      onPress={checkNew}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="medium"
            rounded
            onPress={goToProfile}
            source={{
              uri: `${props.notifData.item.sender_Pic}` || undefined,
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.connectionInfo}>
            <Text style={styles.connect} onPress={goToProfile}>
              {props.notifData.item.sender_name}{' '}
            </Text>
            has a
            <Text style={styles.updateType}>
              {' '}
              {props.notifData.item.urgency}{' '}
            </Text>
            campaign post
          </Text>
          <TimeStamp style={styles.timeStamp} createdAt={createdAt} />
        </View>
        <View style={styles.imgContainer}>
          <Avatar
            size="medium"
            source={{
              uri: `${props.notifData.item.campaign_pic}` || undefined,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    backgroundColor: 'white',
    margin: 3,
  },
  wrapperNew: {
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    margin: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  container: {
    flex: 1,
    height: 20,
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    // padding: 10,
    borderRadius: 0,
    marginVertical: 6,
    alignItems: 'center',
  },
  content: {
    width: '65%',
    marginLeft: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    // flex: 1,
    width: '15%',
    marginLeft: 1,
    alignItems: 'flex-start',
  },
  imgContainer: {
    alignSelf: 'center',
    // flex: 1,
    width: '15%',
    marginRight: 15,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    height: 30,
    padding: 10,
    margin: 'auto',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    // elevation: 10,
  },
  connect: {
    fontFamily: 'Lato-Bold',
  },
  updateType: {
    fontFamily: 'Lato-Bold',
    color: '#E6106F',
    textTransform: 'uppercase',
  },
  connectionInfo: {
    fontFamily: 'Lato',
    fontSize: 17,
  },
  timeStamp: {
    fontFamily: 'Lato',
    fontSize: 13,
    color: '#B5B5B5',
  },
});

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  currentUser: state.currentUser,
  token: state.token,
  deleteBuffer: state.pending.deletePost,
  bookmarks: state.bookmarks,
  bookmarksLoading: state.pending.bookmarks,
  bookmarksError: state.errors.bookmarks,
});

export default connect(mapStateToProps, {
  // toggleCampaignText,
  // addBookmark,
  // removeBookmark,
  // fetchBookmarks,
})(withNavigationFocus(CampaignNotification));
