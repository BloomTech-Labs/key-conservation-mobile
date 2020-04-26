import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';

class SkillContent extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      skillExpand: true,
      isReachable: true,
      skills: props.skills
    };
  }

  skillExpand = () =>{
    this.setState({skillExpand: !this.state.skillExpand})
  };

  toggleReachMeSwitch = () =>{
    this.setState({isReachable: !this.state.isReachable})
  };

  render() {
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={this.skillExpand}>
          <Sync/>
          <Text style={styles.itemTitleText}>
            Our Skills
          </Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.skillExpand ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {this.state.skillExpand ? (
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
                  thumbColor={this.state.isReachable ? "#fffeff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleReachMeSwitch}
                  value={this.state.isReachable}
                />
              </View>
            </View>
        ) : null}
      </View>
    );
  }
}

export default SkillContent;
