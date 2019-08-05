import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import { connect } from "react-redux";

//import { Input } from 'react-native-elements';

//import styles from '../constants/Stylesheet';

import { postUser } from "../store/actions";

class UsernameScreen extends React.Component {
  
  state = {
    usernameInput: ""
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
    console.log(user);
    await this.props.postUser(user);
    this.props.navigation.navigate(error ? "CreateAccount" : "Conservationist");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.Card} />
          <View style = {styles.textContainer}>
            <Text>
              Thanks for signing up! Please choose a username and enter it below.
            </Text>
          </View>
          <TextInput
            returnKeyType="go"
            placeholder="ex: carribbeanturtleproject"
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
            <Text style={styles.touchableText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

UsernameScreen.navigationOptions = {
  title: "Sign Up"
}

const mapStateToProps = state => ({
  error: state.error,
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  { postUser }
)(UsernameScreen);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    margin: 15,
    flex: 1,
    alignItems: 'center'
  },
  Card: {
    marginTop: 20,
    backgroundColor: "#fff",
    width: "100%",
    padding: 25
  },
  inputContain: {
    borderWidth: 2,
    borderColor: "#C4C4C4",
    padding: 5,
    borderRadius: 3,
    fontSize: 16,
    width: 281,
    height: 38,
    marginBottom: 53
  },
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableView: {
    backgroundColor: "#00FF9D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 48,
    width:243,
  },
  touchableText: {
    color: "black",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 2
  },

  textContainer: {
    width: 279,
    height: 43,
    marginBottom: 33,
    fontSize: 16,
    flexWrap: 'wrap',
    letterSpacing: 2
  }
});
