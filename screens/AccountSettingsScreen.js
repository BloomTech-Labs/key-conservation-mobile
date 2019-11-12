import React from "react";
import {
  Text,
  View,
  TouchableOpacity
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
      };

      render(){
          return(
            <ScrollView>
              <View style={styles.logoutSection}>
                <TouchableOpacity
                style={styles.logoutButton}
                onPress={this.logoutPress}
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