import React from "react";
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { ScrollView, NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { postCampaign, getCampaigns, clearMedia } from "../store/actions";
import BackButton from "../components/BackButton";
import PublishButton from "../components/PublishButton";
import { AmpEvent } from "../components/withAmplitude";
import UploadMedia from "../components/UploadMedia";

import styles from "../constants/screens/CreateCampScreen";
import CheckMark from "../assets/icons/checkmark-24.png";

// url for heroku staging vs production server
// production
//const seturl = 'https://key-conservation.herokuapp.com/api/'
// staging
const seturl = "https://key-conservation-staging.herokuapp.com/api/";

const filterUrls = (keys, object) => {
  // If a user doesn't include http or https in there URL this function will add it.
  // If they already include it it will be ignored. and if its capital "Https || Http" it will become lowercase.
  keys.forEach(key => {
    if (
      object[key] &&
      object[key] !== null &&
      object[key].indexOf("http://") !== 0 &&
      object[key].indexOf("https://") !== 0
    ) {
      object[key] = object[key].toLowerCase();
      object[key] = "https://" + object[key];
    }
  });
  return object;
};

class CreateCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "New Campaign",
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
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <PublishButton
          navigation={navigation}
          pressAction={navigation.getParam("publish")}
        />
      )
    };
  };

  state = {
    users_id: this.props.currentUserProfile.id,
    camp_name: "",
    camp_desc: "",
    camp_cta: "",
    urgency: null,
    loading: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ publish: this.publish });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#00FF9D" />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={90}
        enabled={Platform.OS === "android" ? true : false}
      >
        <KeyboardAwareScrollView>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: "#DCDCDC",
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
                  placeholder="Add Campaign Name"
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
              <View style={styles.mediaSection}>
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
                  placeholder="https://www.carribbeanseaturtle.com/donate"
                  keyboardType="default"
                  placeholder="Please include full URL"
                  autoCapitalize="none"
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ camp_cta: text })}
                  value={this.state.camp_cta}
                />
              </View>
              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Urgency Level</Text>
                <Text style={styles.bodyText}>
                  Select one. This can be changed at a future date.
                </Text>
                <View style={styles.urgencyMenu}>
                  <TouchableOpacity
                    style={styles.urgencyOption}
                    onPress={() => this.setUrgency("Critical")}
                  >
                    <Text style={styles.criticalUrgency}>Critical</Text>
                    {this.state.urgency === "Critical" ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.urgencyText}>
                      Dire consequences may occur if no immediate support made
                      available.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.urgencyOption}
                    onPress={() => this.setUrgency("Urgent")}
                  >
                    <Text style={styles.urgentUrgency}>Urgent</Text>
                    {this.state.urgency === "Urgent" ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.urgencyText}>
                      Immediate support needed but it's not critical.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.urgencyOption}
                    onPress={() => this.setUrgency("Longterm")}
                  >
                    <Text style={styles.longtermUrgency}>Longterm</Text>
                    {this.state.urgency === "Longterm" ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.urgencyText}>
                      Support is needed but can be raised over a longer period
                      of time.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    );
  }

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

  publish = async () => {
    this.setState({
      ...this.state,
      loading: true
    });
    if (
      !this.props.mediaUpload ||
      !this.state.camp_name ||
      !this.state.camp_desc ||
      !this.state.camp_cta
    ) {
      const errorMessage =
        "Form incomplete. Please include:" +
        (this.props.mediaUpload ? "" : "\n    - Campaign Image") +
        (this.state.camp_name ? "" : "\n    - Campaign Name") +
        (this.state.camp_desc ? "" : "\n    - Campaign Details") +
        (this.state.camp_cta ? "" : "\n    - Donation Link");
      return Alert.alert("Error", errorMessage);
    } else {
      const camp = {
        users_id: this.props.currentUserProfile.id,
        camp_name: this.state.camp_name,
        camp_desc: this.state.camp_desc,
        camp_cta: this.state.camp_cta,
        urgency: this.state.urgency,
        camp_img: this.props.mediaUpload
      };
      this.postCampaign(camp);
    }
  };

  postCampaign = camp => {
    if (
      this.props.mediaUpload.includes(".mov") ||
      this.props.mediaUpload.includes(".mp3") ||
      this.props.mediaUpload.includes(".mp4")
    ) {
      Alert.alert("We're uploading your video!");
    }
    const filteredCamp = filterUrls(["camp_cta"], camp);
    const uri = filteredCamp.camp_img;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });
    formData.append("camp_cta", filteredCamp.camp_cta);
    formData.append("camp_desc", filteredCamp.camp_desc);
    formData.append("camp_name", filteredCamp.camp_name);
    formData.append("users_id", filteredCamp.users_id);
    formData.append("urgency", filteredCamp.urgency);
    axios
      .post(`${seturl}campaigns/`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.props.token}`,
          "Content-Type": "application/json"
        }
      })
      .then(async res => {
        console.log("SUCCESS", res.data.newCamps);
        AmpEvent("Campaign Created");
        // await this.props.postCampaign(res.data.newCamps);
        await this.setState({
          ...this.state,
          loading: false
        });
        this.props.navigation.navigate("Home");
      })
      .catch(err => {
        console.log(err);
      });
  };

  clearState = () => {
    this.setState({
      loading: false,
      users_id: this.props.currentUserProfile.id,
      camp_img: this.props.mediaUpload,
      camp_name: "",
      camp_desc: "",
      camp_cta: "",
      urgency: null
    });
  };
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  mediaUpload: state.mediaUpload,
  allCampaigns: state.allCampaigns,
  token: state.token
});

export default connect(mapStateToProps, {
  postCampaign,
  getCampaigns,
  clearMedia
})(CreateCampScreen);
