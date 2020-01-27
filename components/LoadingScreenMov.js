import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function LoadingScreenMov() {
  // const styles = StyleSheet.create({
  //   container: { flex: 1, justifyContent: "center" },
  //   backgroundVideo: {
  //     position: "absolute",
  //     top: 0,
  //     left: 0,
  //     bottom: 0,
  //     right: 0
  //   }
  // });
  console.log(Video.didJustFinish);

  return (
    <View>
      <Video
        source={require("../assets/images/Key_Intro.mp4")}
        rate={1.0}
        volume={1.0}
        resizeMode="cover"
        shouldPlay
        didJustFinish
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
