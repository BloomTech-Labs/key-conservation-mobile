import React from 'react';
import {View, Text, ScrollView} from 'react-native';

class AccountSettings extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          title: "Account Settings",
          headerStyle: {
            backgroundColor: "#323338"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            flexGrow: 1,
            alignSelf: "center"
          },
          headerLeft: <BackButton navigation={navigation} />,
          headerRight: (
            <DoneButton
              navigation={navigation}
              pressAction={navigation.getParam("done")}
            />
          )
        };
      };

      state = {
        org_name: this.props.currentUserProfile.org_name,
        profile_image: this.props.currentUserProfile.profile_image,
        username: this.props.currentUserProfile.username,
        location: this.props.currentUserProfile.location,
        mini_bio: this.props.currentUserProfile.mini_bio,
        email: this.props.currentUserProfile.email,
        org_link_url: this.props.currentUserProfile.org_link_url,
        org_link_text: this.props.currentUserProfile.org_link_text,
        facebook: this.props.currentUserProfile.facebook,
        instagram: this.props.currentUserProfile.instagram,
        twitter: this.props.currentUserProfile.twitter,
        about_us: this.props.currentUserProfile.about_us,
        species_and_habitats: this.props.currentUserProfile.species_and_habitats,
        issues: this.props.currentUserProfile.issues,
        phone_number: this.props.currentUserProfile.phone_number,
        org_cta: this.props.currentUserProfile.org_cta
      };

      render(){
          return(
            <ScrollView>
              <View style={styles.logoutSection}>
                <Text style={styles.accountSettingsText}>Account Settings</Text>
                <TouchableOpacity
                onPress={this.logoutPress}
                style={styles.logoutButton}
                >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          );
      };



}