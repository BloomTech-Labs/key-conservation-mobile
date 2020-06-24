import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { getConnections, getProfileData } from '../../store/actions';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import styles from '../../constants/Connections/Cards';
import { withNavigation } from 'react-navigation';

const OrganizationsCard = (props) => {
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
    getProfileData();
  }, []);

  useEffect(() => {
    getConnections();
  }, []);

  let selectedUserConnections = connections?.filter
    ? props.selectedProfile.roles === 'supporter'
      ? connections.filter(
          (connect) =>
            connect.status === 'Connected' &&
            connect.connected_role === 'conservationist'
        )
      : connections.filter(
          (connect) =>
            connect.status === 'Connected' &&
            connect.connector_role === 'conservationist'
        )
    : [];

  return (
    <View style={styles.mainContainer}>
      {selectedUserConnections?.length === 0 ? (
        <Text style={styles.noConnections}>No Current Connections</Text>
      ) : (
        <View>
          {selectedUserConnections?.map((connection) => (
            <View style={styles.card} key={connection.id}>
              <View style={styles.peopleCardContainer} key={connection.id}>
                <View style={styles.userInfo} key={connection.id}>
                  <View style={styles.imageContainer} key={connection.id}>
                    <Avatar
                      size={48}
                      rounded
                      key={connection.id}
                      source={{
                        uri:
                          props.selectedProfile.id === connection.connector_id
                            ? connection.connected_avatar
                            : connection.connector_avatar,
                      }}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        props.selectedProfile.id === connection.connector_id
                          ? props.navigation.push('Profile', {
                              selectedProfile: connection.connected_id,
                            })
                          : props.navigation.push('Profile', {
                              selectedProfile: connection.connector_id,
                            });
                      }}
                    >
                      <Text key={connection.id} style={styles.name}>
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
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  selectedProfile: state.selectedProfile,
});
export default connect(mapStateToProps, { getConnections, getProfileData })(
  withNavigation(OrganizationsCard)
);
