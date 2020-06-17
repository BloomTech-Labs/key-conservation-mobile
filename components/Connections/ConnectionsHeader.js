import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Button, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  getConnections,
  connectRequest,
  deleteConnection,
  createNotification,
} from '../../store/actions';
import styles from '../../constants/Profile/ProfileHeader';

const Connect = (props) => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const connection = await props.getConnections(props.profileId);
      if (connection.length !== undefined) setConnections(connection);
      else throw new Error(connection);
    } catch (error) {
      Alert.alert('Failed to get connections');
    }
  };

  useEffect(() => {
    if (props.profileId) getConnections();
  }, [props.profileId]);

  const connectRequest = () => {
    setConnections([
      ...connections,
      {
        connector_id: props.currentUserProfile.id, // this will be the sender_id
        connected_id: props.profileId, // This is the user id
        status:
          props.profileData?.roles === 'supporter' ? 'Pending' : 'Following',
      },
    ]);
    // console.log('connectionRequest', id);
    console.log('test', props.profileId);
    props
      .connectRequest(props.profileId)
      .then(() => {
        getConnections(props.currentUserProfile.id);
        props.createNotification({
          notification_type: 0,
          pathway: 'Connections',
          sender_id: props.currentUserProfile.id, // props.currentUserProfile.id
          sender_name: props.currentUserProfile.name, // props.currentUserProfile.name
          sender_pic: props.currentUserProfile.profile_image, // props.currentUserProfile.profile_image
          user_id: props.profileId, // props.profileId
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const disconnect = () => {
    setConnections(connections.filter?.((c) => c.id !== myConnection.id));
    props
      .deleteConnection(myConnection.id, props.profileId)
      .then(() => {
        getConnections();
      })
      .catch(() => {
        Alert.alert('Failed to remove connection');
      });
  };

  const promptDelete = () => {
    Alert.alert(
      'Remove Connection',
      `Are you sure you want to remove this connection?`,
      [
        {
          text: 'Remove',
          style: 'destructive',
          onPress: disconnect,
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  let selectedUserConnections =
    connections?.filter?.((connect) => connect.status === 'Connected') || [];

  const myConnection = connections?.find(
    (connection) =>
      connection.connector_id === props.currentUserProfile.id ||
      connection.connected_id === props.currentUserProfile.id
  );

  const isConnected = myConnection && myConnection.status !== 'Pending';
  const isPending = myConnection && myConnection.status === 'Pending';

  const buttonTitle =
    props.profileData?.roles === 'conservationist' &&
      props.currentUserProfile.roles === 'supporter'
      ? isConnected
        ? 'Following'
        : 'Follow'
      : isPending
        ? 'Pending'
        : isConnected
          ? 'Connected'
          : 'Connect';

  const test = () => {
    console.log(props);
    props
      .connectRequest(props.profileId)
      .then(() => {
        props.createNotification({
          notification_type: 0,
          pathway: 'Connections',
          sender_id: props.currentUserProfile.id, // props.currentUserProfile.id
          sender_name: props.currentUserProfile.name, // props.currentUserProfile.name
          sender_pic: props.currentUserProfile.profile_image, // props.currentUserProfile.profile_image
          user_id: props.profileId, // props.profileId
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });

    // .connectRequest(props.profileId)
    // .then(() => {
    //   getConnections();
    // })
    // .catch((error) => {
    //   Alert.alert(error.message);
    // });
  };

  return (
    <View style={styles.connectContainer}>
      <TouchableOpacity
        style={styles.connectText}
        onPress={() => {
          props.profileId !== props.currentUserProfile.id
            ? props.navigation.push('SelectedConnections', (props = { props }))
            : props.navigation.push('Connections', (props = { props }));
        }}
      >
        <Text style={styles.textNumber}>{selectedUserConnections.length}</Text>
        <View>
          <Text style={styles.textWord}>Connections</Text>
        </View>
      </TouchableOpacity>
      {(props.profileId !== props.currentUserProfile.id &&
        props.profileData.roles !== 'supporter' &&
        props.currentUserProfile.roles === 'conservationist') ||
        (props.profileId !== props.currentUserProfile.id &&
          (props.profileData.roles === 'supporter' ||
            props.profileData.roles === 'conservationist') &&
          props.currentUserProfile.roles === 'supporter') ? (
          <View style={styles.buttonContainer}>
            <View
              style={{
                ...styles.connectButton,
                fontFamily: 'Lato-Bold',
                backgroundColor: isConnected ? '#00FD9B' : '#fff',
              }}
            >
              <Button
                color="black"
                title={buttonTitle}
                onPress={() => {
                  return isConnected ? promptDelete() : connectRequest();
                }}
              />
            </View>
          </View>
        ) : null}
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  selectedProfile: state.selectedProfile,
  connections: state.connections,
  createNotificationLoading: state.createNotificationLoading,
});

export default connect(mapStateToProps, {
  connectRequest,
  deleteConnection,
  getConnections,
  createNotification,
})(withNavigation(Connect));
