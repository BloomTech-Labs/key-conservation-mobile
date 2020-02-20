import React from "react";
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { ScrollView, NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { editCampaign, getCampaigns, clearMedia } from "../store/actions";
import BackButton from "../components/BackButton";

import DoneButton from "../components/DoneButton";
import UploadMedia from "../components/UploadMedia";

import styles from "../constants/screens/EditCampScreen";
import CheckMark from "../assets/icons/checkmark-24.png";

class EditCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Campaign",
      headerStyle: {
        backgroundColor: "#323338"
      },
      headerTintColor: "#fff",
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam("edit")}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.selectedCampaign = this.props.navigation.getParam('selectedCampaign') || {};

    this.state = {
      camp_img: this.selectedCampaign.camp_img,
      camp_name: this.selectedCampaign.camp_name,
      camp_desc: this.selectedCampaign.camp_desc,
      camp_cta: this.selectedCampaign.camp_cta,
      urgency: this.selectedCampaign.urgency
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ edit: this.edit });
  }

  edit = async () => {
    if (
      !this.state.camp_img ||
      !this.state.camp_name ||
      !this.state.camp_desc ||
      !this.state.camp_cta
    ) {
      return;
    } else {
      let changes = this.state;
      if (this.props.mediaUpload) {
        changes = {
          ...this.state,
          camp_img: this.props.mediaUpload
        };
      }
      await this.props.editCampaign(
        this.selectedCampaign.camp_id,
        changes
      );
      this.props.navigation.goBack();
    }
  };

  clearState = () => {
    this.setState({
      camp_img: this.selectedCampaign.camp_img,
      camp_name: this.selectedCampaign.camp_name,
      camp_desc: this.selectedCampaign.camp_desc,
      camp_cta: this.selectedCampaign.camp_cta,
      urgency: this.selectedCampaign.urgency
    });
  };

  setUrgency = urgencyLevel => {
    if (this.state.urgency === urgencyLevel) {
      this.setState({
        urgency: null
      });
    } else {
      this.setState({
        urgency: urgencyLevel
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={90}
        enabled={Platform.OS === "android" ? true : false}
      >
        <KeyboardAwareScrollView>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: "#fff",
              minHeight: "100%"
            }}
          >
            <NavigationEvents
              onWillFocus={this.props.clearMedia}
              onDidBlur={this.clearState}
            />
            <View style={styles.sectionContainer}>
              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Campaign Name</Text>
                <TextInput
                  ref={input => {
                    this.campNameInput = input;
                  }}
                  returnKeyType="next"
                  placeholder="Koala In Need!"
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ camp_name: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === "android") return;
                    this.campImgUrlInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === "android"}
                  value={this.state.camp_name}
                />
              </View>
              <View style={styles.sections}>
                <UploadMedia />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Campaign Details</Text>
                <TextInput
                  ref={input => {
                    this.campDetailsInput = input;
                  }}
                  returnKeyType="next"
                  placeholder="Add campaign details and list of monetary needs."
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ camp_desc: text })}
                  multiline={true}
                  value={this.state.camp_desc}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Donation Link</Text>
                <TextInput
                  ref={input => {
                    this.donationLinkInput = input;
                  }}
                  returnKeyType="next"
                  keyboardType="default"
                  placeholder="Please include full URL"
                  autoCapitalize="none"
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ camp_cta: text })}
                  value={this.state.camp_cta}
                />
              </View>

              <View>
                <Text style={styles.sectionsText}>Urgency Level</Text>
                <Text style={{ color: "#C4C4C4" }}>
                  Select one. This can be changed at a future date.
                </Text>
                <View style={styles.urgencyMenu}>
                  <TouchableOpacity
                    style={styles.urgencyOption}
                    onPress={() => this.setUrgency("Critical")}
                  >
                    <Text style={{ color: "#FF6C7C" }}>Critical</Text>
                    {this.state.urgency === "Critical" ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.urgencyOption}
                    onPress={() => this.setUrgency("Urgent")}
                  >
                    <Text style={{ color: "#FFDB11" }}>Urgent</Text>
                    {this.state.urgency === "Urgent" ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.urgencyOption}
                    onPress={() => this.setUrgency("Longterm")}
                  >
                    <Text style={{ color: "#00FF9D" }}>Longterm</Text>
                    {this.state.urgency === "Longterm" ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, {
  editCampaign,
  getCampaigns,
  clearMedia
})(EditCampScreen);
