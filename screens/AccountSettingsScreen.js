import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Linking
} from "react-native";
import { ScrollView, NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import { logout } from "../store/actions";
import * as SecureStorage from "expo-secure-store";
import BackButton from "../components/BackButton";
import DoneButton from "../components/DoneButton";

import styles from "../constants/screens/AccountSettingsScreen";

class AccountSettingsScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          title: "Account Settings",
          headerStyle: {
            backgroundColor: "#323338"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            flexGrow: 1,
            alignSelf: "center"
          },
          headerLeft: <BackButton navigation={navigation} />,
          headerRight: (
            <DoneButton
              navigation={navigation}
              pressAction={navigation.getParam("done")}
            />
          )
        };
      };

      componentDidMount() {
        this.props.navigation.setParams({ done: this.done });
      }

      done = () => {
          this.props.navigation.goBack();
      };

      logoutPress = async () => {
        await SecureStorage.deleteItemAsync("sub", {});
        await SecureStorage.deleteItemAsync("email", {});
        await SecureStorage.deleteItemAsync("roles", {});
        await SecureStorage.deleteItemAsync("id", {});
        await SecureStorage.deleteItemAsync("userId", {});
        await SecureStorage.deleteItemAsync("accessToken", {});
        this.props.logout();
        this.props.navigation.navigate("Loading");

        const logoutURL = 'https://key-conservation.auth0.com/v2/logout?federated&client_id=elyo5qK7vYReEsKAPEADW2T8LAMpIJaf';

        Linking.canOpenURL(logoutURL).then(supported => {
          if (supported) {
            Linking.openURL(logoutURL);
          } else {
            console.log("Don't know how to open URI: " + logoutURL);
          }
        });
      };

      render(){
          return(
            <ScrollView>
          <View style={styles.logoutSection}>
              <TouchableOpacity
                onPress={this.logoutPress}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          );
      };



}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
});

export default connect(
  mapStateToProps,
  { logout }
)(AccountSettingsScreen);