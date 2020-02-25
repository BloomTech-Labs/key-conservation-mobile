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

  let currentUserConnections = connections?.filter
    ? connections.filter(
        connect =>
          connect.status === 'Connected' &&
          connect.connected_role === 'conservationist'
      )
    : [];

  return (
    <View style={styles.mainContainer}>
      {currentUserConnections?.map(connection => (
        <View style={styles.card} key={connection.connection_id}>
          <View style={styles.cardContainer} key={connection.connection_id}>
            <View style={styles.imageContainer} key={connection.connection_id}>
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
  );
};

const mapStateToProps = state => ({
  connections: state.connections,
  currentUserProfile: state.currentUserProfile
});
export default connect(mapStateToProps, { getConnections })(OrganizationsCard);
