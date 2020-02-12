import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import Auth0 from 'react-native-auth0';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

import KeyInfoGreen from '../assets/jsicons/KeyCon/Key_Info_Green';

import LoginForm from '../components/Auth/LoginForm';

import styles from '../constants/screens/LoginScreen';

import { loginStart, loginError, loginSuccess, getAirtableKey } from '../store/actions';
import AnimalModal from '../components/Animals/AnimalModal';

const DEVICE_WIDTH = Dimensions.get('screen').width;

const AUTH0_DOMAIN = 'https://key-conservation.auth0.com/';

export default LoginScreen = props => {
  navigationOptions = () => {
    return {
      header: null
    };
  };

  const { navigation } = props;

  const dispatch = useDispatch();

  const [role, setRole] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [animation] = useState(
    new Animated.ValueXY({ x: DEVICE_WIDTH, y: -DEVICE_WIDTH })
  );

  const enterAnim = Animated.timing(animation, {
    toValue: {
      x: 0,
      y: 0
    },
    duration: 240
  });

  const exitAnim = Animated.timing(animation, {
    toValue: {
      x: DEVICE_WIDTH,
      y: -DEVICE_WIDTH
    },
    duration: 240
  });

  useEffect(() => {
    if (!role) {
      exitAnim.start();
    } else enterAnim.start();
  }, [role]);

  const realmLogin = (username, password) => {
    const clientId =
      role === 'supporter'
        ? 'DikbpYHJNM2TkSU9r9ZhRlrMpEdkyO0S'
        : 'elyo5qK7vYReEsKAPEADW2T8LAMpIJaf';
    const realm =
      role === 'supporter' ? 'SupporterDB' : 'Username-Password-Authentication';

    const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId });

    dispatch(loginStart());
    auth0.auth
      .passwordRealm({
        username,
        password,
        realm,
        scope: 'openid profile email'
      })
      .then(credentials => {
        onSuccess(credentials);
      })
      .catch(error => {
        onFailure(error.message);
        console.log(error.message);
      });
  };

  // This function is for social authentication integrations
  // The function auth0.webAuth.authorize() used in this function
  // does not work because certain NativeModules need to be linked
  // which will need this project to be ejected from expo
  // For a google sign-on, a Google account for Key Conservation
  // must be set up with OAuth dev keys, and that information
  // should be set up on the Auth0 dashboard. I'm sure there is
  // a way to get OAuth working without needing to link those custom
  // NativeModules, but this feature will have to wait until a
  // Google account with OAuth dev keys is set up.
  const webAuth = connection => {
    const clientId =
      role === 'supporter'
        ? 'DikbpYHJNM2TkSU9r9ZhRlrMpEdkyO0S'
        : 'elyo5qK7vYReEsKAPEADW2T8LAMpIJaf';

    const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId });

    dispatch(loginStart());

    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        connection
      })
      .then(credentials => {
        onSuccess(credentials);
        console.log(credentials);
      })
      .catch(error => {
        onFailure(error.message);
        console.log(error.message);
      });
  };

  const onSuccess = async (credentials) => {
    dispatch(loginSuccess(credentials, role));

    // Make sure airtableKey exists
    const key = await SecureStore.getItemAsync('airtableKey', {});

    if(!key) {
      dispatch(getAirtableKey());
    }
  }

  const onFailure = message => {
    dispatch(loginError(message));
    Alert.alert(message);
  }

  const formOpacity = animation.x.interpolate({
    inputRange: [0, DEVICE_WIDTH / 2, DEVICE_WIDTH],
    outputRange: [1, 0.2, 0]
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../assets/images/loginscreen2.png')}
        style={styles.container}
      >
        <AnimalModal
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
        <View style={styles.logoContainer}>
          <Image
            style={isModalVisible === false ? styles.logo : styles.Hidden}
            source={require('../assets/images/keyFullWhite.png')}
          />
        </View>
        <KeyboardAvoidingView
          behavior='position'
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.subContainer}>
            <Animated.View
              style={[
                styles.formView,
                { left: animation.x, right: animation.y, opacity: formOpacity }
              ]}
            >
              <LoginForm
                navigation={navigation}
                role={role}
                realmLogin={realmLogin}
                webAuth={webAuth}
                goBack={() => {
                  setRole('');
                  Keyboard.dismiss();
                }}
              />
            </Animated.View>
            <View style={styles.titleContainer}>
              <Text style={styles.selectTitle}>JOIN THE COMMUNITY</Text>
              <Text style={styles.highlight}>EMPOWERING HOPE</Text>
              <Text style={styles.selectText}>Select One:</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => {
                  setRole('supporter');
                  // login(navigation);
                }}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>I want to help</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRole('conservationist');
                  // login(navigation);
                }}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>
                  My organization needs help
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.aboutIconContainer}>
              <TouchableOpacity
                style={styles.aboutIconTouch}
                onPress={() => {
                  setIsModalVisible(true);
                }}
              >
                <KeyInfoGreen />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
