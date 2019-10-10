import React from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getProfileData } from "../store/actions";
import FeedCampaign from "../components/FeedScreen/FeedCampaign";
import FeedUpdate from "../components/FeedScreen/FeedUpdate";
import ProfileHeader from "../components/Profile/ProfileHeader";
import BackButton from "../components/BackButton";

class ProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerStyle: {
        backgroundColor: "#323338"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        alignSelf: "center",
        fontFamily: "OpenSans-SemiBold"
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerRight: <View />
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      // creates sticky header
      <ScrollView stickyHeaderIndices={[0]}>
        <ProfileHeader
          navigation={navigation}
          profile={this.props.selectedProfile}
          myProfile={false}
        />
        {this.props.selectedProfile.campaigns.map(camp => {
          if (camp.update_id) {
            return (
              <FeedUpdate
                key={`update${camp.update_id}`}
                data={camp}
                toggled
                navigation={navigation}
              />
            );
          } else {
            return (
              <FeedCampaign
                key={camp.camp_id}
                data={camp}
                toggled
                navigation={navigation}
              />
            );
          }
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile
});

export default connect(
  mapStateToProps,
  { getProfileData }
)(ProScreen);
