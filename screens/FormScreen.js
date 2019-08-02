import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

//import { Input } from 'react-native-elements';

//import styles from '../constants/Stylesheet';

import { postUser } from '../store/actions';

class FormScreen extends React.Component {
  state = {
    usernameInput: ''
  };

  handlePress = async () => {
    const { error } = this.props;
    const { sub, role, email } = this.props.currentUser;
    let user = {
      username: this.state.usernameInput,
      sub: sub,
      roles: role,
      email: email
    };
    await this.props.postUser(user);
    this.props.navigation.navigate(error ? 'CreateAccount' : 'Conservationist');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.Card} />
          <TextInput
            returnKeyType='go'
            placeholder='Username'
            style={styles.inputContain}
            onChangeText={text => this.setState({ usernameInput: text })}
            value={this.state.usernameInput}
            required
          />
        </View>
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.touchableButton}
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Register</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

FormScreen.navigationOptions = {
  title: 'Form',
  headerStyle: {
    backgroundColor: '#323338'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center'
  }
};

const mapStateToProps = state => ({
  error: state.error,
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  { postUser }
)(FormScreen);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 15
  },
  Card: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  inputContain: {
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 3,
    fontSize: 16
  },
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: '100%',
    height: 50
  },
  touchableView: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 35
  },
  touchableText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2
  }
});
