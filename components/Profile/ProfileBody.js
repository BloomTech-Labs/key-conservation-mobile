import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import styles from '../../constants/Profile/ProfileBody';

import Details from './tabs/Details';
import Campaigns from './tabs/Campaigns';
import Location from './tabs/Location';

export default class ProfileBody extends Component {
  constructor(props) {
    super(props);

    let routes = this.props.profile.roles === 'supporter' ? [
      { key: 'details', title: 'Details' }
    ] : [
      { key: 'campaigns', title: 'Campaigns' },
      { key: 'details', title: 'Details' }
    ]

    // If the profile in questions is an organization and has a location,
    // insert a tab in index 1 (in the middle as per designs)
    if(this.props.profile.roles === 'conservationist' && this.props.profile.location) {
      routes.splice(1, 0, { key: 'location', title: 'Location' })
    }

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
                backgroundColor: 'white',
                borderBottomColor: `rgba(0, 255, 157, ${
                  this.state.index === i ? 1 : 0
                })`
              }}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text style={{fontFamily: 'Lato-Bold', fontSize: 16}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = SceneMap({
    campaigns: () => <Campaigns profile={this.props.profile} />,
    location: () => <Location profile={this.props.profile} />,
    details: () => <Details profile={this.props.profile} />
  })

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
