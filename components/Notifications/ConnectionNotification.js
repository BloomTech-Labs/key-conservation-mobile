import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Button,
  Alert,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import TimeStamp from './TimeStamp';
import { connect } from 'react-redux';
import {
  editConnectStatus,
  markNotification,
  getConnections,
  deleteConnection,
} from '../../store/actions';
import X from '../../assets/jsicons/miscIcons/X';
{
  /* TEAL COLOR: #00FF9D */
}

const ConnectionNotification = (props) => {
  const createdAt = props.notifData.item.time;
  const [data, setData] = useState(props.notifData.item);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    getConnections();
    console.log('props.notifData.item', props.notifData.item);
  }, [data]);

  const goToCommenterProfile = () => {
    props.nav.push('Profile', {
      selectedProfile: props.notifData.item.sender_id,
    });
  };

  const promptDelete = () => {
    Alert.alert(
      'Decline Connection',
      `Are you sure you want to decline this connection?`,
      [
        {
          text: 'Decline',
          style: 'destructive',
          onPress: disconnect,
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getConnections = async () => {
    try {
      const connection = await props.getConnections(
        props.notifData.item.user_id
      );
      if (Array.isArray(connection)) setConnections(connection);
      else throw new Error(connection);
    } catch (error) {
      Alert.alert('Failed to get connections');
    }
  };

  const myPendingConnection = connections?.find(
    (connection) => connection.connector_id === props.notifData.item.sender_id
  );

  const approveRequest = () => {
    props.editConnectStatus(myPendingConnection.id, {
      status: 'Connected',
    });
    mark();
    Alert.alert('You Are Now Connected');
  };

  const disconnect = () => {
    console.log('props.notifData.item.sender_id', myPendingConnection.id);
    props.deleteConnection(myPendingConnection.id);
  };

  const handleMark = () => {
    console.log('handleMark');
    props
      .markNotification(
        props.notifData.item.user_id,
        props.notifData.item.notification_id
      )
      .then(() => {
        goToCommenterProfile();
      });
  };

  const mark = () => {
    props.markNotification(
      props.notifData.item.user_id,
      props.notifData.item.notification_id
    );
  };

  return (
    <TouchableOpacity
      style={
        props.notifData.item.new_notification
          ? styles.wrapperNew
          : styles.wrapper
      }
      onPress={() => {
        handleMark();
      }}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={goToCommenterProfile}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: `${props.notifData.item.sender_pic}` || undefined,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.connectionInfo}>
            <Text style={styles.connect} onPress={goToCommenterProfile}>
              {props.notifData.item.sender_name}{' '}
            </Text>
            wants to connect
          </Text>
          <TimeStamp style={styles.timeStamp} createdAt={createdAt} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => approveRequest()}
        >
          <Text style={styles.connect}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => promptDelete()}>
          <X />
        </TouchableOpacity>
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
    borderRadius: 0,
    marginVertical: 6,
    alignItems: 'center',
  },
  content: {
    width: '55%',
    marginLeft: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    width: '15 %',
    marginLeft: 1,
  },
  avatar: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  button: {
    minWidth: '17%',
    width: 'auto',
    borderRadius: 7.5,
    height: 30,
    paddingRight: 15,
    paddingLeft: 15,
    margin: 'auto',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#00FF9D',
    alignItems: 'flex-end',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    elevation: 10,
  },
  connect: {
    fontFamily: 'Lato-Bold',
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

export default connect(null, {
  editConnectStatus,
  markNotification,
  deleteConnection,
  getConnections,
})(ConnectionNotification);
