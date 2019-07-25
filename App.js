import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
      require('./assets/images/keyFullBlack.png')
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      ArchivoNarrow: require('./assets/fonts/Archivo_Narrow/ArchivoNarrow-Regular.ttf'),
      Lato: require('./assets/fonts/Lato/Lato-Regular.ttf')
    })
  ]);
}

function handleLoadingError(error: Error) {
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
