import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { getConnections } from '../../store/actions';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from '../../constants/Connections/Cards';
import { withNavigation } from 'react-navigation';
const PeopleCard = props => {
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

  let selectedUserConnections = connections?.filter
    ? props.selectedProfile.roles === 'conservationist'
      ? connections.filter(
          connect =>
            connect.status === 'Connected' &&
            connect.connector_role === 'supporter'
        )
      : connections.filter(
          connect =>
            connect.status === 'Connected' &&
            connect.connected_role === 'supporter'
        )
    : [];

  return (
    <View>
      <View style={styles.mainContainer}>
        {selectedUserConnections?.length === 0 ? (
          <Text style={styles.noConnections}>No Current Connections</Text>
        ) : (
          <View>
            {selectedUserConnections?.map(connection => (
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
                            props.selectedProfile.id === connection.connector_id
                              ? connection.connected_avatar
                              : connection.connector_avatar
                        }}
                      />
                    </View>
                    <TouchableOpacity
                    onPress={() => {
                        props.selectedProfile.id === connection.connector_id
                        ? props.navigation.push('Pro', {
                            selectedProfile: connection.connected_id
                          })
                        : props.navigation.push('Pro', {
                            selectedProfile: connection.connector_id
                          })
                    }}
                  >
                      <Text key={connection.connection_id} style={styles.name}>
                        {connection.connected_name === null
                          ? '---'
                          : props.selectedProfile.id === connection.connector_id
                          ? connection.connected_name
                          : connection.connector_name}
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
  );
};

const mapStateToProps = state => ({
  connections: state.connections,
  currentUserProfile: state.currentUserProfile,
  selectedProfile: state.selectedProfile
});

export default connect(mapStateToProps, { getConnections })(
  withNavigation(PeopleCard)
);
