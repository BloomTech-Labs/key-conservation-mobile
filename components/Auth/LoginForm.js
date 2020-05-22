import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { navigate } from '../../navigation/RootNavigator';

import styles from '../../constants/Auth/LoginForm';

import Lock from '../../assets/jsicons/auth/Lock';
import Envelope from '../../assets/jsicons/auth/Envelope';
import PasswordTooltip from './PasswordTooltip';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      showPasswordTooltip: false,
      type: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.type !== this.props.type) {
      this.setState({ type: this.props.type });
      // A change has been detected, switch focus
      // back to email field if password field
      // is selected for best user experience
      if (this.passwordInput?.isFocused()) {
        this.emailInput.focus();
      }
    }
  }

  // There is a bug in React Native that causes the Keyboard.dismiss()
  // method to be unresponsive after an autocomplete event on iOS
  // The remedy for this is to set focus on some element before calling
  // the dismiss function
  resetFocus = () => {
    if (this.state.keyboardOpen) {
      this.passwordInput.focus();
    }
    this.passwordInput.blur();
  };

  validateLogin = () => {
    this.resetFocus();

    Keyboard.dismiss();

    let emailError = false;
    let passwordError = false;

    if (!this.state.email.length) {
      emailError = true;
    }
    if (!this.state.password.length) {
      passwordError = true;
    }
    this.setState({
      emailError: emailError,
      passwordError: passwordError,
    });
    if (emailError === false && passwordError === false) {
      this.props.realmLogin(this.state.email, this.state.password);
    }
  };

  showTOS() {
    WebBrowser.openBrowserAsync(
      'https://www.keyconservation.org/termsandconditions'
    );
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <Envelope />
          <TextInput
            placeholder="email@example.com"
            placeholderTextColor="rgba(44,44,44,0.4)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            style={[styles.input, this.state.emailError && styles.inputError]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            ref={(input) => (this.emailInput = input)}
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text.trim() })}
          />
        </View>
        <View style={styles.inputField}>
          <PasswordTooltip
            password={this.state.password}
            show={this.state.showPasswordTooltip && this.state.type}
          />
          <Lock />
          <TextInput
            placeholder="password"
            placeholderTextColor="rgba(44,44,44,0.4)"
            secureTextEntry
            returnKeyType="go"
            onSubmitEditing={this.validateLogin}
            autoCapitalize="none"
            autoCorrect={false}
            style={[
              styles.input,
              this.state.passwordError && styles.inputError,
            ]}
            onFocus={() => this.setState({ showPasswordTooltip: true })}
            onBlur={() => this.setState({ showPasswordTooltip: false })}
            ref={(input) => (this.passwordInput = input)}
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text.trim() })}
          />
        </View>
        <View style={styles.footnoteContainer}>
          <TouchableOpacity
            onPress={() =>
              this.state.type
                ? this.showTOS()
                : navigate('ResetPassword', {
                    resetPassword: this.props.resetPassword,
                    email: this.state.email,
                  })
            }
          >
            <Text style={styles.footnote}>
              {this.state.type
                ? `By signing up, you agree to our terms of service and privacy policy`
                : `Don't remember your password?`}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.validateLogin()}
        >
          <Text style={styles.button}>
            {this.state.type ? 'SIGN UP' : 'LOG IN'}
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => this.props.webAuth('google-oauth2')}>
        <Text style={styles.button}>Sign In with Google</Text>
      </TouchableOpacity>
    </View> */}
      </View>
    );
  }
}

export default LoginForm;
