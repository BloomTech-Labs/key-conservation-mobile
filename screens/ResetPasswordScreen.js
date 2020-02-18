import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ChevronLeft from '../assets/jsicons/miscIcons/ChevronLeftBlack';
import {
  TouchableOpacity,
  TextInput
} from 'react-native-gesture-handler';
import Envelope from '../assets/jsicons/auth/Envelope';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../constants/screens/ResetPasswordScreen'

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.navigation.getParam('email')
    };

    this.resetPassword = this.props.navigation.getParam('resetPassword');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.backButton}
            >
              <ChevronLeft width='20' height='20' />
              <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Forgot password</Text>
          <View style={styles.headerRight} />
        </View>
        <KeyboardAwareScrollView enableOnAndroid={true} style={styles.content}>
          <Text style={styles.headingText}>Reset your password</Text>
          <Text style={styles.paragraph}>
            If you can't remember your password, enter your email below and we
            will send you a link to reset your password. If you cannot remember
            the email address associated with your account, please contact us
            via our website to help locate your account.
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <Envelope />
              <TextInput
                placeholder='email@example.com'
                placeholderTextColor='rgba(44,44,44,0.4)'
                returnKeyType='next'
                onSubmitEditing={() => {}}
                style={styles.input}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text.trim() })}
              />
            </View>
          </View>
          <TouchableOpacity
            style={
              this.state.email
                ? styles.buttonContainer
                : { ...styles.buttonContainer, backgroundColor: 'gray' }
            }
            onPress={() =>
              this.resetPassword(this.state.email)?.then(() =>
                this.props.navigation.goBack()
              )
            }
          >
            <Text style={styles.button}>RESET PASSWORD</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ResetPasswordScreen;
