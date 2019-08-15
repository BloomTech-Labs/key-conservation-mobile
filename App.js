import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import * as Amplitude from 'expo-analytics-amplitude';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const navState = (nextScreen, action) => {
    const object = {
      prevScreen: nextScreen.routes[0].routeName,
      nextScreen: nextScreen.routes[1].routeName,
      action: action.type
    };
    return object;
  };

  const handleNavigationChange = (prevState, newState, action) => {
    // console.log('screen changed');
    // console.log('previous screen', newState.routes[0].routeName);
    // console.log('next screen', newState.routes[1].routeName);
    // console.log('action', action.type);

    const navigationAnalytics = navState(newState, action);
    console.log(navigationAnalytics);
    Amplitude.logEventWithProperties('Screen Navigation', navigationAnalytics);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => {
          Amplitude.initialize('0e3d4f261c96385cef3f8ab5973ea054');
          Amplitude.setUserId('testingBasicSetup');
          Amplitude.logEvent('Connected');
          handleFinishLoading(setLoadingComplete);
        }}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
        {Platform.OS === 'android' && (
          <StatusBar barStyle='light-content' translucent />
        )}
        <Provider store={store}>
          <MenuProvider>
            <AppNavigator
              onNavigationStateChange={(prevState, newState, action) => {
                console.log('made it in');
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
    Asset.loadAsync([
      require('./assets/images/keyFullBlack.png'),
      require('./assets/images/keyFullWhite.png'),
      require('./assets/images/FurBackground.png')
    ]),
    Font.loadAsync({
      'OpenSans-Regular': require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      'OpenSans-SemiBold': require('./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf')
    })
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
    backgroundColor: '#fff'
  }
});
