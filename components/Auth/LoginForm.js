import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  Animated
} from 'react-native';

import { connect } from 'react-redux';

import styles from '../../constants/Auth/LoginForm';
import ChevronLeft from '../../assets/jsicons/miscIcons/ChevronLeftSolid';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      loadingOpacity: new Animated.Value(0),
      keyboardOpen: false
    };

    this.animateLoadIn = Animated.timing(this.state.loadingOpacity, {
      toValue: 1
    })

    this.animateLoadOut = Animated.timing(this.state.loadingOpacity, {
      toValue: 0
    })
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({keyboardOpen: true}));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>  this.setState({keyboardOpen: false}));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  validateLogin = () => {
    this.resetFocus();

    Keyboard.dismiss();

    let usernameError = false;
    let passwordError = false;

    if (!this.state.username.length) {
      usernameError = true;
    }
    if (!this.state.password.length) {
      passwordError = true;
    }
    this.setState({
      usernameError: usernameError,
      passwordError: passwordError
    });
    if (usernameError === false && passwordError === false) {
      this.props.realmLogin(this.state.username, this.state.password);
    }
  };

  // There is a bug in React Native that causes the Keyboard.dismiss()
  // method to be unresponsive after an autocomplete event on iOS
  // The remedy for this is to set focus on some element before calling
  // the dismiss function
  resetFocus = () => {
    if(this.state.keyboardOpen) {
      this.passwordInput.focus();
    }
    this.passwordInput.blur();
  }

  componentDidUpdate() {
    if(this.props.loading) {
      this.animateLoadIn.start();
    } else {
      this.animateLoadOut.start();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          pointerEvents={this.props.loading ? 'auto' : 'none'}
          style={[styles.loading, { opacity: this.state.loadingOpacity }]}
        >
          <ActivityIndicator size='large' />
        </Animated.View>
        <View style={styles.headerSection}>
          <TouchableOpacity
            onPress={() => {
              this.resetFocus();
              this.props.goBack()
            }}
            style={styles.backButton}
          >
            <ChevronLeft fill='#000' />
          </TouchableOpacity>
          <Text style={styles.headerText}>Login as a {this.props.role}</Text>
        </View>
        {this.props.role === 'supporter' ? (
          <Text>
            Support conservation efforts around the world by donating,
            volunteering and lending your skills
          </Text>
        ) : (
          <Text>Get access to supporters for your cause from all around the world</Text>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Email address'
            placeholderTextColor='rgba(44,44,44,0.4)'
            returnKeyType='next'
            onSubmitEditing={() => this.passwordInput.focus()}
            style={[
              styles.input,
              this.state.usernameError && styles.inputError
            ]}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={() => this.setState({ usernameError: '' })}
            value={this.state.username}
            onChangeText={text => this.setState({ username: text.trim() })}
          />
          <TextInput
            placeholder='Password'
            placeholderTextColor='rgba(44,44,44,0.4)'
            secureTextEntry
            returnKeyType='go'
            onSubmitEditing={this.validateLogin}
            autoCapitalize='none'
            autoCorrect={false}
            onBlur={() => {
              Keyboard.dismiss();
              this.setState({ passwordError: '' });
            }}
            style={[
              styles.input,
              this.state.passwordError && styles.inputError
            ]}
            ref={input => (this.passwordInput = input)}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text.trim() })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.validateLogin()}>
              <Text style={styles.button}>Sign In</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.buttonContainerInset}>
            <TouchableOpacity onPress={() => this.props.webAuth('google-oauth2')}>
              <Text style={styles.buttonInset}>Sign In with Google</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.noAccount}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity style={styles.signUpContainer}>
              <Text style={styles.signUp}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.pending.login
});

export default connect(mapStateToProps, {})(LoginForm);
