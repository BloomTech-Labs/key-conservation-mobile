import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
        {Platform.OS === 'android' && <StatusBar barStyle='light-content' translucent />}
        <Provider store={store}>
          <MenuProvider>
            <AppNavigator />
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
