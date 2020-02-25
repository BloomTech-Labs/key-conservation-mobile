import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import BackButton from '../../components/BackButton';
import styles from '../../constants/Connections/ConnectionTabs';
import Animated from 'react-native-reanimated';

import People from './tabs/PeopleScreen';
import Organizations from './tabs/OrganizationsScreen';

export default class ConnectionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'CONNECTIONS',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    console.log('PROPS', props.profileData);

    const routes = [
      { key: 'organizations', title: 'Organizations' },
      { key: 'people', title: 'People' }
    ];

    this.state = {
      index: 0,
      routes
    };
  }

  handleIndexChange = index => this.setState({ index });

  renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                ...styles.tabItem,
                borderBottomColor: `rgba(0, 255, 157, ${
                  this.state.index === i ? 1 : 0
                })`
              }}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text style={{ fontFamily: 'Lato-Bold', fontSize: 18 }}>
                {route.title}
              </Animated.Text>
              {/* <Badge
                // status='success'
                textStyle={{
                  color: "black",
                  fontSize: 12
                }}
                badgeStyle={{
                  backgroundColor: "#CAFF03"
                }}
                containerStyle={{
                  position: "absolute",
                  top: 10,
                  right: 53
                }}
                value={0}
              /> */}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = SceneMap({
    organizations: () => <Organizations profile={this.props.profile} />,
    people: () => <People profile={this.props.profile} />
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}
