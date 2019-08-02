import React from "react";
import { StyleSheet, ActivityIndicator, View, } from "react-native";
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default class LoggedInView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Loading',
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  };
  async componentDidMount() {
    const savedUser = await SecureStore.getItemAsync("user", {})

    
    if (savedUser && savedUser.name === true) {
        console.log('data is present')
        this.props.navigation.navigate('Conservationist')
    } else {
        console.log('data is not present')
        this.props.navigation.navigate('Login')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(189, 195, 199, 1)",
    alignItems: "center",
    justifyContent: "center"
  }
});
