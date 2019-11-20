import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/KeyConservation.js';

import SvgUri from "react-native-svg-uri";

const KeyConservationScreen = (props) => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>
                Let's go over how Key Conservation works
            </Text>
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("Can")
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>

            {/* <SvgUri
              fill='#3b3b3b'
              width='25'
              height='25'
              source={require("./../../assets/icons/How-it-works.svg")}
            /> */}

        </View>
    );
}

export default KeyConservationScreen;