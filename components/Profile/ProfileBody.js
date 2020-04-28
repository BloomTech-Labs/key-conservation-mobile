import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import styles from '../../constants/Profile/ProfileBody';

import Details from './tabs/Details';
import Campaigns from './tabs/Campaigns';
import Location from './tabs/Location';


export default React.forwardRef((props, ref) => {
  const routes =
    props.profile.roles === 'supporter'
      ? [
          { key: 'campaigns', title: 'My Campaigns' },
          { key: 'details', title: 'Details' }
        ]
      : [
          { key: 'campaigns', title: 'Campaigns' },
          { key: 'details', title: 'Details' },
        ];

  

  // If the profile in questions is an organization and has a location,
  // insert a tab in index 1 (in the middle as per designs)
  if (props.profile.roles === 'conservationist' && props.profile.location) {
    routes.splice(1, 0, { key: 'location', title: 'Location' });
  }

  const [state, setState] = useState({
    index: 0,
    routes,
  });

  const handleIndexChange = (index) => {
    props.scrollToMaximizeContent(index === state.index);
    setState((prevState) => ({ ...prevState, index }));
  };

  const renderTabBar = ({ navigationState }) => {
    const distance = props.contentPaddingTop - props.headerHeight;

    const translateY = props.contentPaddingTop
      ? props.scrollY.interpolate({
          inputRange: [0, distance, distance * 2],
          outputRange: [0, 0, distance],
        })
      : 0;

    return (
      <Animated.View
        style={[styles.tabBar, { transform: [{ translateY: translateY }] }]}
      >
        {navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                ...styles.tabItem,
                backgroundColor: 'white',
                borderBottomColor: `rgba(0, 255, 157, ${
                  state.index === i ? 1 : 0
                })`,
              }}
              onPress={() => handleIndexChange(i)}
            >
              <Animated.Text style={{ fontFamily: 'Lato-Bold', fontSize: 18 }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    );
  };

  const renderScene = SceneMap({
    campaigns: () => <Campaigns profile={props.profile} />,
    location: () => <Location profile={props.profile} />,
    details: () => <Details profile={props.profile} />,
  });

  return (
    <TabView
      sceneContainerStyle={{
        flex: 1,
        paddingTop: 48,
      }}
      navigationState={state}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
  );
});
