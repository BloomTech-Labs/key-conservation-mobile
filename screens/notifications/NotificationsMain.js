import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import BackButton from '../../components/BackButton';

import Messages from '../../assets/jsicons/bottomnavigation/Messages';
import Bell from '../../assets/jsicons/bottomnavigation/BellB';

class NotificationsMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isActive: true}
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Notifications',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff'
    };
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.tabContainer}>
            <TouchableOpacity style={!this.state.isActive ? styles.tabButtonSelected : styles.tabButton} onPress={() => this.setState({isActive: !this.state.isActive})}>
                <Messages />
            </TouchableOpacity>
            <TouchableOpacity style={this.state.isActive ? styles.tabButtonSelected : styles.tabButton} onPress={() => this.setState({isActive: !this.state.isActive})}>
                <Bell />
            </TouchableOpacity>
        </View>
        <View style={styles.contentContainerA}>

        </View>
        <View style={styles.contentContainerB}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

    wrapper: {

        flex: 1,
        width: '100%',
        height: '100%'

    },
    tabContainer: {

        flex: 1,
        flexDirection: 'row',
        width: '100%',
        maxHeight: '10%'

    },
    tabButton: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%'

    },
    tabButtonSelected: {


        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        marginLeft: 8,
        marginRight: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#00FF9A'

    },
    tabIcon: {

        width: '15%',
        height: '15%'

    },
    contentContainerA: {

        width: '100%',
        height: '90%',

    },
    contentContainerB: {

        display: 'none'

    }

});

export default NotificationsMain;
