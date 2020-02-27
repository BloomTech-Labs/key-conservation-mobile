import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Button, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  getConnections,
  connectRequest,
  deleteConnection
} from '../../store/actions';
import styles from '../../constants/Profile/ProfileHeader';

const Connect = props => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const connection = await props.getConnections(props.profileId);
      if (Array.isArray(connection)) setConnections(connection);
      else throw new Error(connection);
    } catch (error) {
      Alert.alert('Failed to get connections');
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const connectRequest = () => {
    setConnections([
      ...connections,
      {
        connector_id: props.currentUserProfile.id,
        connected_id: props.profileId,
        status:
          props.profileData?.roles === 'supporter' ? 'Pending' : 'Following'
      }
    ]);
    props.connectRequest(props.profileId).then(error => {
      if (error) Alert.alert(error.message);
      getConnections();
    });
  };

  const disconnect = () => {
    setConnections(
      connections.filter(c => c.connection_id !== myConnection.connection_id)
    );
    props
      .deleteConnection(myConnection.connection_id, props.profileId)
      .then(error => {
        if (error) Alert.alert('Failed to remove connection');
        getConnections();
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
          onPress: disconnect
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  let selectedUserConnections = connections?.filter
    ? connections.filter(connect => connect.status === 'Connected')
    : [];

  const myConnection = connections?.find(
    connection =>
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

  return (
    <View style={styles.connectContainer}>
      <TouchableOpacity
        style={styles.connectText}
        onPress={() =>
          props.navigation.navigate('Connections', (props = { props }))
        }
      >
        <Text style={styles.textNumber}>{selectedUserConnections.length}</Text>
        <View>
          <Text style={styles.textWord}>Connections</Text>
        </View>
      </TouchableOpacity>
      {props.profileId !== props.currentUserProfile.id ? (
        <View style={styles.buttonContainer}>
          <View
            style={{
              ...styles.connectButton,
              fontFamily: 'Lato-Bold',
              backgroundColor: isConnected ? '#00FD9B' : '#fff'
            }}
          >
            <Button
              color='black'
              title={buttonTitle}
              onPress={() => {
                return isConnected
                  ? promptDelete()
                  : connectRequest(props.profileId);
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedProfile: state.selectedProfile,
  connections: state.connections
});

export default connect(mapStateToProps, {
  connectRequest,
  deleteConnection,
  getConnections
})(withNavigation(Connect));
