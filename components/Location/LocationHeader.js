import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { ScrollView } from "react-navigation";
import { AmpEvent } from "../withAmplitude";
import { FontAwesome } from "@expo/vector-icons";

import styles from "../../constants/LocationScreen/LocationHeader";

export default LocationHeader = props => {
  return (
    <View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.TouchableOpacity]}
          onPress={() =>
            props.navigation.navigate(props.myProfile ? "MyPro" : "Pro")
          }
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.DetailButton}>Campaigns</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.TouchableOpacity,
            null ? {} : { borderBottomColor: "#00FF9D", borderBottomWidth: 2 }
          ]}
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.CampaignButton}>Location</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => {
            props.navigation.navigate(props.myProfile ? "MyDetail" : "Detail");
          }}
        >
          <View style={styles.ButtonStyle}>
            <Text style={styles.DetailButton}>Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
