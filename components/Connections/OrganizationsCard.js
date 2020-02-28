import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { getConnections } from '../../store/actions';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import X from '../../assets/jsicons/miscIcons/X';
import styles from '../../constants/Connections/Cards';

const OrganizationsCard = props => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const connection = await props.getConnections(
        props.currentUserProfile.id
      );
      if (Array.isArray(connection)) setConnections(connection);
      else throw new Error(connection);
    } catch (error) {
      Alert.alert('Failed to get your connections');
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const disconnect = () => {
    setConnections(
      connections.filter(
        c => c.connection_id !== myPendingConnection.connection_id
      )
    );
    props.deleteConnection(myPendingConnection.connection_id).then(error => {
      if (error) Alert.alert('Failed to decline connection');
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

  let supCurrentUserConnections = typeof connections?.filter === 'function'
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          connect.connected_role === 'conservationist'
      )
    : [];

  let orgCurrentUserConnections = typeof connections?.filter === 'function'
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          connect.connector_role === 'conservationist'
      )
    : [];

  let currentUserPendingConnections = typeof connections?.filter === 'function'
    ? connections.filter(
        connect =>
          connect.status === 'Pending' &&
          connect.connector_role === 'conservationist'
      )
    : [];

  return (
    <View>
      {props.currentUserProfile.roles === 'conservationist' ? (
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
                        <TouchableOpacity style={styles.button}>
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
            {orgCurrentUserConnections?.length === 0 ? (
              <Text style={styles.noConnections}>No Current Connections</Text>
            ) : (
              <View>
                {orgCurrentUserConnections?.map(connection => (
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
                                connections.connector_id
                                  ? connection.connected_avatar
                                  : connection.connector_avatar
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            key={connection.connection_id}
                            style={styles.name}
                          >
                            {connection.connected_name === null
                              ? '---'
                              : props.currentUserProfile.id ===
                                connection.connector_id
                              ? connection.connected_name
                              : connection.connector_name}
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
          {supCurrentUserConnections?.length === 0 ? (
            <Text style={styles.noConnections}>No Current Connections</Text>
          ) : (
            <View>
              {supCurrentUserConnections?.map(connection => (
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
                          uri: connection.connected_avatar
                        }}
                      />
                    </View>
                    <View>
                      <Text key={connection.connection_id} style={styles.name}>
                        {connection.connected_name === null
                          ? '---'
                          : connection.connected_name}
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
  currentUserProfile: state.currentUserProfile,
  selectedProfile: state.selectedProfile
});
export default connect(mapStateToProps, { getConnections })(OrganizationsCard);
