import React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { ScrollView, NavigationEvents } from "react-navigation";
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

      render(){
          return(
            <ScrollView>
              <View style={styles.logoutSection}>
                <TouchableOpacity
                style={styles.logoutButton}
                >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          );
      };



}

export default AccountSettingsScreen;