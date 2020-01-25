import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Slick from "react-native-slick";

var styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  slide5: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide6: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide7: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  slide8: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide9: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide10: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  }
});

export default function LoadingScreenMov() {
  return (
    <Slick style={styles.wrapper} showsButtons={false}>
      <View style={styles.slide1}>
        <Image source={require("../assets/images/greatgreen.png")} />
      </View>
      <View style={styles.slide2}>
        <Image source={require("../assets/images/bongo.png")} />
      </View>
      <View style={styles.slide3}>
        <Image source={require("../assets/images/kakapo.png")} />
      </View>
      <View style={styles.slide4}>
        <Image source={require("../assets/images/zebra.png")} />
      </View>
      <View style={styles.slide5}>
        <Image source={require("../assets/images/bubble.png")} />
      </View>
      <View style={styles.slide6}>
        <Image source={require("../assets/images/loading-whaleshark.png")} />
      </View>
      <View style={styles.slide7}>
        <Image source={require("../assets/images/loading-pangolin.png")} />
      </View>
      <View style={styles.slide8}>
        <Image source={require("../assets/images/loading-gorilla.png")} />
      </View>
      <View style={styles.slide9}>
        <Image source={require("../assets/images/loading-stripes.png")} />
      </View>
      <View style={styles.slide10}>
        <Image source={require("../assets/images/splash.png")} />
      </View>
    </Slick>
  );

  //   var item_length = $("View > Image").length - 1;
  //   var slider = $("View").slick({
  //     autoplay: true,
  //     autoplaySpeed: 300,
  //     dots: false,
  //     infinite: false,
  //     speed: 300,
  //     fade: false,
  //     slide: "View",
  //     cssEase: "linear"
  //   });
  //   // On before slide change
  //   slider.on("afterChange", function(event, slick, currentSlide, nextSlide) {
  //     //check the length of total items in .slide container
  //     //if that number is the same with the number of the last slider
  //     //Then pause the slider
  //     if (item_length === slider.slick("slickCurrentSlide")) {
  //       //this should do the same thing -> slider.slickPause();
  //       slider.slickSetOption("autoplay", false, false);
  //     }
  //   });

  //   return (
  //     <View>
  //       <Image source={require("../assets/images/greatgreen.png")} />
  //       <Image source={require("../assets/images/bongo.png")} />
  //       <Image source={require("../assets/images/kakapo.png")} />
  //       <Image source={require("../assets/images/zebra.png")} />
  //       <Image source={require("../assets/images/bubble.png")} />
  //       <Image source={require("../assets/images/loading-whaleshark.png")} />
  //       <Image source={require("../assets/images/loading-pangolin.png")} />
  //       <Image source={require("../assets/images/loading-gorilla.png")} />
  //       <Image source={require("../assets/images/loading-stripes.png")} />
  //       <Image source={require("../assets/images/splash.png")} />
  //     </View>
  //   );
}
