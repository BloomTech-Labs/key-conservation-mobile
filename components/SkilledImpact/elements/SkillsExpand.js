import React from 'react';
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import { editProfileData } from '../../../store/actions';
import { connect } from 'react-redux';

class SkillsExpand extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      expanded: true,
      acceptingHelp: props.isAcceptingHelp,
      skills: props.skills
    };
  }

  toggleExpand = () =>{
    this.setState({expanded: !this.state.expanded})
  };

  toggleAcceptingHelpSwitch = async () =>{
    //TODO: api request to change the switch state.
    try {
     await this.props.editProfileData(
        this.props.currentUserProfile.id,
        {accepting_help_requests: !this.state.acceptingHelp,
          profile_image:this.props.currentUserProfile.profile_image}
      );
      this.setState({
        acceptingHelp: !this.state.acceptingHelp
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to change accepting help status');
      this.setState({
        loading: false,
        error: 'Failed to change accepting help status'
      });
    }
  };

  render() {
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={this.toggleExpand}>
          <Sync/>
          <Text style={styles.itemTitleText}>
            Our Skills
          </Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.expanded ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View style={styles.itemContentBody}>
              <View style={styles.itemContentRows}>
                {this.state.skills.map((skill, i) => {
                  if(skill) {
                    return (
                      <TouchableOpacity key={i} style={styles.skillsButton}>
                        <Text style={styles.mediumButtonText}>
                          {skill}
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                })}
                <TouchableOpacity style={styles.responsiveButton}>
                  <Text style={styles.buttonTextPlusIcon}>
                    +
                  </Text>
                  <Text style={styles.mediumButtonText}>
                    ADD A SKILL
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemFooterRow}>
                <Text style={styles.reachMeText}>Other Conservation organizations and Researchers can contact me about our skills</Text>
                <Switch
                  style={styles.reachMeSwitch}
                  trackColor={{ false: "#767577", true: "#30d985" }}
                  thumbColor={this.state.acceptingHelp ? "#fffeff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleAcceptingHelpSwitch}
                  value={this.state.acceptingHelp}
                />
              </View>
            </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, {
  editProfileData,
})(SkillsExpand);