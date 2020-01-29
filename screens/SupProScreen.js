import React, { useEffect } from "react";
import { View } from "react-native";
import { Viewport } from "@skele/components";
import { connect } from "react-redux";
import { getProfileData } from "../store/actions";
import SupProfileHeader from "../components/Profile/SupProfileHeader";
import SupProfileBody from "../components/Profile/SupProfileBody";
import BackButton from "../components/BackButton";

const SupProScreen = props => {
  useEffect(() => {
    console.log("hello?");
    props.getProfileData(props.userId, false, "myProfile");
  });

  return (
    <View>
      <SupProfileHeader
        // navigation={navigation}
        profile={props.selectedProfile}
      />
      <SupProfileBody profile={props.selectedProfile} />
    </View>
  );
};

SupProScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Test title",
    // headerLeft: () => <BackButton />,
    headerStyle: {
      backgroundColor: "#323338"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      textAlign: "center",
      flexGrow: 1,
      alignSelf: "center",
      fontFamily: "Lato-Bold"
    },
    headerRight: () => <View />
  };
};

// class SupProScreen extends React.Component {
// static navigationOptions = ({ navigation }) => {
//   return {
//     title: `${this.props.selectedProfile.username}'s Profile`,
//     headerLeft: <BackButton navigation={navigation} />,
//     headerStyle: {
//       backgroundColor: "#323338"
//     },
//     headerTintColor: "#fff",
//     headerTitleStyle: {
//       textAlign: "center",
//       flexGrow: 1,
//       alignSelf: "center",
//       fontFamily: "Lato-Bold"
//     },
//     headerRight: <View />
//   };
// };

// componentDidMount() {
//   this.props.getProfileData(
//     this.props.selectedProfile.id,
//     false,
//     "myProfile"
//   );
// }

//   render() {
//     const { navigation } = this.props;
//     return (
//       <Viewport.Tracker>
//         <SupProfileHeader
//           navigation={navigation}
//           profile={this.props.selectedProfile}
//         />
//         <SupProfileBody profile={this.props.selectedProfile} />
//       </Viewport.Tracker>
//     );
//   }
// }

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile
});
const optionsStyles = {
  optionsContainer: {
    width: 75
  }
};

export default connect(mapStateToProps, { getProfileData })(SupProScreen);
