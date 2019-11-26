import React from "react";
import { Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

import styles from "../constants/screens/LoadingScreen";
import background from "../assets/images/FurBackground.png";

const LogoutScreen = (props) => {
    return (
        <ImageBackground
            source={require("../assets/images/FurBackground.png")}
            style={styles.container}
        >
       <Text style={styles.text}>Logout successful!</Text>
        <TouchableOpacity 
            style={stylie.buttonContainer}
            onPress={() => {
            props.navigation.navigate({routeName: "Loading"})
        }}>
            <Text style={stylie.buttonText}>Log back in!</Text>
        </TouchableOpacity>
        </ImageBackground>
    );
}

export default LogoutScreen;

const stylie = StyleSheet.create({
    buttonContainer: {
        width: '70%',
        height: 50,
        marginBottom: 18,
        borderRadius: 5,
        fontFamily: 'OpenSans-Regular',
        backgroundColor: '#00FF9D',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        justifyContent: 'center',
        marginTop: 10
      },
    buttonText: {
        fontFamily: 'OpenSans-Regular',
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
      }
})