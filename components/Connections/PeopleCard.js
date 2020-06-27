import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { AmpEvent } from '../withAmplitude';
import { Avatar } from 'react-native-elements';
import styles from '../../constants/Connections/Cards';
import X from '../../assets/jsicons/miscIcons/X';
import { NavigationEvents, withNavigation } from 'react-navigation';

import {
  getConnections,
  deleteConnection,
  editConnectStatus,
  goToProfile,
  markAllNotifications,
} from '../../store/actions';
import { connect } from 'react-redux';

const People = (props) => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const connection = await props.getConnections(
        props.currentUserProfile.id
      );
      if (Array.isArray(connection)) setConnections(connection);
      else throw new Error(connection);
    } catch (error) {
      Alert.alert('Failed to get connections');
    }
  };

  const disconnect = () => {
    setConnections(connections.filter((c) => c.id !== myPendingConnection.id));
    props.deleteConnection(myPendingConnection.id).then((error) => {
      if (error) Alert.alert('Failed to Decline Connection');
      getConnections();
    });
  };

  // Deletes the request
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

  // Approves the request
  const approveRequest = () => {
    setConnections(connections.filter((c) => c.id !== myPendingConnection.id));
    props
      .editConnectStatus(myPendingConnection.id, {
        status: 'Connected',
      })
      .then((error) => {
        // if (error) Alert.alert(error.data.msg);
        getConnections();
      });
  };

  useEffect(() => {
    getConnections();
  }, []);

  // Locates a connection based on this cards connected ID
  const myPendingConnection = connections?.find(
    (connection) => connection.connected_id === props.currentUserProfile.id
  );

  let currentUserPendingConnections = connections?.filter
    ? connections.filter(
        (connect) =>
          connect.status === 'Pending' &&
          connect.connector_role === 'supporter' &&
          connect.connector_id !== props.currentUserProfile.id
      )
    : [];

  let supCurrentUserConnections = connections?.filter
    ? connections.filter(
        (connect) =>
          connect.status === 'Connected' &&
          connect.connected_role === 'supporter'
      )
    : [];

  let orgCurrentUserConnections = connections?.filter
    ? connections.filter(
        (connect) =>
          connect.status === 'Connected' &&
          connect.connector_role === 'supporter'
      )
    : [];

  return (
    <View>
      <NavigationEvents
        onDidFocus={() =>
          props.markAllNotifications(props.currentUserProfile.id, '0')
        }
      />
      {props.currentUserProfile.roles === 'supporter' ? (
        <View>
          <View style={styles.mainContainer}>
            {currentUserPendingConnections?.length === 0 ? (
              <Text style={styles.noConnections}>No Pending Connections</Text>
            ) : (
              <View>
                {currentUserPendingConnections?.map((connection) => (
                  <View style={styles.card} key={connection.id}>
                    <View
                      style={styles.peopleCardContainer}
                      key={connection.id}
                    >
                      <View style={styles.userInfo} key={connection.id}>
                        <View style={styles.imageContainer} key={connection.id}>
                          <Avatar
                            size={48}
                            rounded
                            key={connection.id}
                            source={{
                              uri:
                                props.currentUserProfile.id ===
                                connection.connected_id
                                  ? connection.connector_avatar
                                  : connection.connected_avatar,
                            }}
                          />
                        </View>
                        <View>
                          <Text key={connection.id} style={styles.name}>
                            {connection.connector_name === null
                              ? '---'
                              : connection.connector_name}{' '}
                            wants to connect
                          </Text>
                        </View>
                      </View>
                      <View style={styles.statusButtons}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => approveRequest()}
                        >
                          <Text style={styles.buttonText}>Connect</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => promptDelete()}>
                          <X />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.mainContainer}>
            {supCurrentUserConnections?.length === 0 ? (
              <Text style={styles.noConnections}>No Current Connections</Text>
            ) : (
              <View>
                {supCurrentUserConnections?.map((connection) => (
                  <View style={styles.card} key={connection.id}>
                    <View
                      style={styles.peopleCardContainer}
                      key={connection.id}
                    >
                      <View style={styles.userInfo} key={connection.id}>
                        <View style={styles.imageContainer} key={connection.id}>
                          <Avatar
                            size={48}
                            rounded
                            key={connection.id}
                            source={{
                              uri:
                                props.currentUserProfile.id ===
                                connection.connected_id
                                  ? connection.connector_avatar
                                  : connection.connected_avatar,
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            props.currentUserProfile.id ===
                            connection.connected_id
                              ? props.navigation.navigate('Pro', {
                                  selectedProfile: connection.connector_id,
                                })
                              : props.navigation.navigate('Pro', {
                                  selectedProfile: connection.connected_id,
                                });
                          }}
                        >
                          <Text key={connection.id} style={styles.name}>
                            {connection.connector_name === null
                              ? '---'
                              : props.currentUserProfile.id ===
                                connection.connected_id
                              ? connection.connector_name
                              : connection.connected_name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          {orgCurrentUserConnections?.length === 0 ? (
            <Text style={styles.noConnections}>No Current Connections</Text>
          ) : (
            <View>
              {orgCurrentUserConnections?.map((connection) => (
                <View style={styles.card} key={connection.id}>
                  <View style={styles.cardContainer} key={connection.id}>
                    <View style={styles.imageContainer} key={connection.id}>
                      <Avatar
                        size={48}
                        rounded
                        key={connection.id}
                        source={{
                          uri: connection.connector_avatar,
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Profile', {
                          selectedProfile: connection.connector_id,
                        })
                      }
                    >
                      <Text key={connection.id} style={styles.name}>
                        {connection.connector_name === null
                          ? '---'
                          : connection.connector_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  connections: state.connections,
  selectedProfile: state.selectedProfile,
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps, {
  getConnections,
  deleteConnection,
  editConnectStatus,
  goToProfile,
  markAllNotifications,
})(withNavigation(People));
