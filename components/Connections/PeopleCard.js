import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from '../../constants/Connections/Cards';
import X from '../../assets/jsicons/miscIcons/X';
import {
  getConnections,
  deleteConnection,
  editConnectStatus
} from '../../store/actions';
import { connect } from 'react-redux';

const People = props => {
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
    setConnections(
      connections.filter(
        c => c.connection_id !== myPendingConnection.connection_id
      )
    );
    props.deleteConnection(myPendingConnection.connection_id).then(error => {
      if (error) Alert.alert('Failed to Decline Connection');
      getConnections();
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
          onPress: disconnect
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const approveRequest = () => {
    setConnections(
      connections.filter(
        c => c.connection_id !== myPendingConnection.connection_id
      )
    );
    props
      .editConnectStatus(myPendingConnection.connection_id, {
        status: 'Connected'
      })
      .then(error => {
        if (error) Alert.alert('Failed to Approve Connection');
        getConnections();
      });
  };

  useEffect(() => {
    getConnections();
  }, []);

  const myPendingConnection = connections?.find(
    connection => connection.connected_id === props.currentUserProfile.id
  );

  let currentUserPendingConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Pending' && connect.connector_role === 'supporter'
      )
    : [];

  let supCurrentUserConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          connect.connected_role === 'supporter'
      )
    : [];

  let orgCurrentUserConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          connect.connector_role === 'supporter'
      )
    : [];

  return (
    <View>
      {props.currentUserProfile.roles === 'supporter' ? (
        <View>
          <View style={styles.mainContainer}>
            {currentUserPendingConnections?.length === 0 ? (
              <Text style={styles.noConnections}>No Pending Connections</Text>
            ) : (
              <View>
                {currentUserPendingConnections?.map(connection => (
                  <View style={styles.card} key={connection.connection_id}>
                    <View
                      style={styles.peopleCardContainer}
                      key={connection.connection_id}
                    >
                      <View
                        style={styles.userInfo}
                        key={connection.connection_id}
                      >
                        <View
                          style={styles.imageContainer}
                          key={connection.connection_id}
                        >
                          <Avatar
                            size={48}
                            rounded
                            key={connection.connection_id}
                            source={{
                              uri: connection.connector_avatar
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            key={connection.connection_id}
                            style={styles.name}
                          >
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
                {supCurrentUserConnections?.map(connection => (
                  <View style={styles.card} key={connection.connection_id}>
                    <View
                      style={styles.peopleCardContainer}
                      key={connection.connection_id}
                    >
                      <View
                        style={styles.userInfo}
                        key={connection.connection_id}
                      >
                        <View
                          style={styles.imageContainer}
                          key={connection.connection_id}
                        >
                          <Avatar
                            size={48}
                            rounded
                            key={connection.connection_id}
                            source={{
                              uri:
                                props.currentUserProfile.id ===
                                connection.connected_id
                                  ? connection.connector_avatar
                                  : connection.connected_avatar
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            key={connection.connection_id}
                            style={styles.name}
                          >
                            {connection.connector_name === null
                              ? '---'
                              : props.currentUserProfile.id ===
                                connection.connected_id
                              ? connection.connector_name
                              : connection.connected_name}
                          </Text>
                        </View>
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
              {orgCurrentUserConnections?.map(connection => (
                <View style={styles.card} key={connection.connection_id}>
                  <View
                    style={styles.cardContainer}
                    key={connection.connection_id}
                  >
                    <View
                      style={styles.imageContainer}
                      key={connection.connection_id}
                    >
                      <Avatar
                        size={48}
                        rounded
                        key={connection.connection_id}
                        source={{
                          uri: connection.connector_avatar
                        }}
                      />
                    </View>
                    <View>
                      <Text key={connection.connection_id} style={styles.name}>
                        {connection.connector_name === null
                          ? '---'
                          : connection.connector_name}
                      </Text>
                    </View>
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
const mapStateToProps = state => ({
  connections: state.connections,
  currentUserProfile: state.currentUserProfile
});
export default connect(mapStateToProps, {
  getConnections,
  deleteConnection,
  editConnectStatus
})(People);
