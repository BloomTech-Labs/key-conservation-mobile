import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import { AmpInit, AmpEvent } from './components/withAmplitude';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import WebSocketManager from './websockets/WebSocketManager';

import { navigationRef } from './navigation/RootNavigator';

// componentWillReceiveProps and componentWillMount seem to be being used in a dependency library. The following line mutes warnings in the app
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps',
  'Warning: componentWillMount',
]);

export default App;

// initialize WebSocketManager
WebSocketManager().getInstance();

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const handleNavigationChange = (prevState, newState, action) => {
    routeSupply = () => {
      if (action.key) {
        const key = action.key;
        if (key.search('id') === 0) {
          return 'Unique screen - Campaign Post/Edit Profile/Detail screen';
        } else {
          return action.key;
        }
      } else if (action.routeName) {
        return action.routeName;
      }
    };
    AmpEvent('Screen Navigation', { navigatedTo: routeSupply() });
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => {
          handleFinishLoading(setLoadingComplete);
          AmpInit();
        }}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && (
          <StatusBar barStyle="light-content" translucent />
        )}
        <Provider store={store}>
          <MenuProvider>
            <AppNavigator
              ref={navigationRef}
              onNavigationStateChange={(prevState, newState, action) => {
                handleNavigationChange(prevState, newState, action);
              }}
            />
          </MenuProvider>
        </Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require('./assets/images/splash.png')]),
    Font.loadAsync({
      Lato: require('./assets/fonts/Lato/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
