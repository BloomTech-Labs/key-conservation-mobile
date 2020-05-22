import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import TimeStamp from './TimeStamp';

const CampaignNotification = (props) => {
  // useEffect(() => {

  //     // console.log(props);
  //     // console.log(props.notifData.item.sender_name);
  //     // console.log(props.notifData.item.sender_Pic);

  // });

  const goToProfile = () => {
    props.nav.push('Pro', {
      selectedProfile: props.notifData.item.sender_id,
    });
  };

  const createdAt = props.notifData.item.time;

  return (
    <TouchableOpacity style={styles.wrapper}>
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
            <Text style={styles.connect}>
              {props.notifData.item.sender_name}{' '}
            </Text>
            has a
            <Text style={styles.updateType}>
              {' '}
              {props.notifData.item.campaign_update_type}{' '}
            </Text>
            campaign post
          </Text>
          <TimeStamp style={styles.timeStamp} createdAt={createdAt} />
        </View>
        <View style={styles.avatarContainer}>
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
    flex: 5,
    marginLeft: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    flex: 1,
    marginLeft: 1, //no need to put px all numbers are already knownas it? Ok,
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
    elevation: 10,
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

export default CampaignNotification;
