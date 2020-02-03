import React from "react";
import { View, StyleSheet } from "react-native";
import WideMap from "./WideMap";
import MapSearchBarComponent from "../../components/Search/MapSearchComponent";
import BackButton from "../../components/BackButton";

class WideMapScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Organization Locations",
      headerStyle: {
        backgroundColor: "#323338"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        marginTop: 18,
        alignSelf: "center"
      },
      headerLeft: () => <BackButton navigation={navigation} />
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <MapScreenHeader /> */}
        <MapSearchBarComponent style={styles.mapSearchBar} />
        <WideMap navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: "5%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  mapSearchBar: {
    zIndex: 1000
  }
});

export default WideMapScreen;
