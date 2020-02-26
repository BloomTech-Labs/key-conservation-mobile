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
      Alert.alert('Failed to get connections');
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  let supCurrentUserConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          connect.connected_role === 'conservationist'
      )
    : [];

  let orgCurrentUserConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          connect.connector_role === 'conservationist'
      )
    : [];

  let currentUserPendingConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Pending' &&
          connect.connector_role === 'conservationist'
      )
    : [];

  console.log(currentUserPendingConnections);

  return (
    <View>
      {props.currentUserProfile.roles === 'conservationist' ? (
        <View style={styles.mainContainer}>
          {currentUserPendingConnections?.map(connection => (
            <View style={styles.card} key={connection.connection_id}>
              <View
                style={styles.peopleCardContainer}
                key={connection.connection_id}
              >
                <View style={styles.userInfo} key={connection.connection_id}>
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
          <View style={styles.mainContainer}>
            {orgCurrentUserConnections?.map(connection => (
              <View style={styles.card} key={connection.connection_id}>
                <View
                  style={styles.peopleCardContainer}
                  key={connection.connection_id}
                >
                  <View style={styles.userInfo} key={connection.connection_id}>
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
        </View>
      ) : (
        <View style={styles.mainContainer}>
          {supCurrentUserConnections?.map(connection => (
            <View style={styles.card} key={connection.connection_id}>
              <View style={styles.cardContainer} key={connection.connection_id}>
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
  );
};

const mapStateToProps = state => ({
  connections: state.connections,
  currentUserProfile: state.currentUserProfile
});
export default connect(mapStateToProps, { getConnections })(OrganizationsCard);
