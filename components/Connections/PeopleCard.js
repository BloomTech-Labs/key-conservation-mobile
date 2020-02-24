import React, { useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from '../../constants/Connections/Cards';
import X from '../../assets/jsicons/miscIcons/X';
import { getConnections } from '../../store/actions';
import { connect } from 'react-redux';

const People = props => {
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
            ((props.currentUserProfile.id === connection.connector_id ||
              props.currentUserProfile.id === connection.connected_id) &&
              connection.status === 'approved') ||
            'accepted'
        );

  let type;
  return (
    <View style={styles.mainContainer}>
      {currentUserConnections.map(connection => (
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
                    uri: connection.avatar
                  }}
                />
              </View>
              <View>
                <Text key={connection.connection_id} style={styles.name}>
                  {connection.name === null ? '---' : connection.name} wants to
                  connect
                </Text>
              </View>
            </View>
            <View style={styles.statusButtons}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Connect</Text>
              </TouchableOpacity>
              <X />
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
export default connect(mapStateToProps, { getConnections })(People);
