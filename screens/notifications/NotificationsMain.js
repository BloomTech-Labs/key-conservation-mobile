import React from 'react';
import { View } from 'react-native';

import WideMap from './WideMap';
import MapSearchBarComponent from '../../components/Search/MapSearchComponent';
import BackButton from '../../components/BackButton';
import styles from '../../constants/Map/WideMapScreen';

class NotificationsMain extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Organization Locations',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff'
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <MapSearchBarComponent
        // style={styles.mapSearchBar}
        />
        <WideMap navigation={this.props.navigation} />
      </View>
    );
  }
}

export default NotificationsMain;
