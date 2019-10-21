import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-navigation";

import SvgUri from "react-native-svg-uri";

import styles from "../../constants/Profile/SupProfileBody";

const SupProfileBody = props => {
  let profile = props.profile;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              fill='#3b3b3b'
              width='25'
              height='25'
              source={require("../../assets/icons/clipboard.svg")}
            />
            <Text style={styles.titleText}>{"About Me"}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{profile.mini_bio}</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              fill='#3b3b3b'
              width='25'
              height='25'
              source={require("../../assets/icons/seedling.svg")}
            />
            <Text style={styles.titleText}>{"Species & Habitats"}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{profile.species_and_habitats}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SupProfileBody;
