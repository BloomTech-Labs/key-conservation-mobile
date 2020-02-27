import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { getConnections } from '../../store/actions';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from '../../constants/Connections/Cards';

const OrganizationsCard = props => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const connection = await props.getConnections(props.selectedProfile.id);
      if (Array.isArray(connection)) setConnections(connection);
      else throw new Error(connection);
    } catch (error) {
      Alert.alert('Failed to get your connections');
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  let orgCurrentUserConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          (connect.connector_role === 'supporter' ||
            connect.connected_role === 'suporter')
      )
    : [];

  console.log(connections);

  return (
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
                        uri:
                          props.selectedProfile.id === connections.connector_id
                            ? connection.connected_avatar
                            : connection.connector_avatar
                      }}
                    />
                  </View>
                  <View>
                    <Text key={connection.connection_id} style={styles.name}>
                      {connection.connected_name === null
                        ? '---'
                        : props.selectedProfile.id === connection.connector_id
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
  );
};

const mapStateToProps = state => ({
  connections: state.connections,
  currentUserProfile: state.currentUserProfile,
  selectedProfile: state.selectedProfile
});
export default connect(mapStateToProps, { getConnections })(OrganizationsCard);
