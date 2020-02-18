import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import styles from '../../constants/Profile/ProfileBody';

import Details from './tabs/Details';

const CampaignScene = () => (
  <View>
    <Text>Campaigns</Text>
  </View>
);

export default class ProfileBody extends Component {
  constructor(props) {
    super(props);

    const routes = this.props.profile.roles === 'supporter' ? [
      { key: 'details', title: 'Details' }
    ] : [
      { key: 'campaigns', title: 'Campaigns' },
      // { key: 'location', title: 'Location' },
      { key: 'details', title: 'Details' }
    ]

    this.state = {
      index: 0,
      routes
    };
  }

  handleIndexChange = index => this.setState({ index });

  renderTabBar = props => {
    // console.log(props);
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
              <Animated.Text style={{fontFamily: 'Lato', fontSize: 16}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = SceneMap({
    campaigns: CampaignScene,
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
