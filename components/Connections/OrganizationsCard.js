import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getConnections } from '../../store/actions';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from '../../constants/Connections/Cards';

const OrganizationsCard = props => {
  const getConnections = async () => {
    try {
      await props.getConnections(props.currentUserProfile.id);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  let currentUserConnections =
    props.connections === undefined
      ? null
      : props.connections.filter(
          connection =>
            (props.currentUserProfile.id === connection.connector_id ||
              props.currentUserProfile.id === connection.connected_id) &&
            (connection.status === 'approved' || 'accepted')
        );

  return (
    <View style={styles.mainContainer}>
      {currentUserConnections.map(connection => (
        <View style={styles.card} key={connection.connection_id}>
          <View style={styles.cardContainer} key={connection.connection_id}>
            <View style={styles.imageContainer} key={connection.connection_id}>
              <Avatar
                size={48}
                rounded
                key={connection.connection_id}
                source={{
                  uri: connection.avatar
                }}
              />
            </View>
            <View>
              <Text key={connection.connection_id} style={styles.name}>
                {connection.name === null ? '---' : connection.name}
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
