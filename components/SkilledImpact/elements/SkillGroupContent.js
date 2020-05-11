import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import SkillGroupElement from './SkillGroupElement';

class SkillGroupContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      skillGroups: props.skillGroups,
    };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity
          style={styles.itemTitleRow}
          onPress={this.toggleExpand}
        >
          <Sync />
          <Text style={styles.itemTitleText}>My Skilled Groups</Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.expanded ? <ChevronBottom /> : <ChevronRight />}
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View style={styles.itemContentBody}>
            <View style={styles.itemContentRows}>
              {this.state.skillGroups.map((skillGroup, i) => {
                if (skillGroup) {
                  return (
                    <SkillGroupElement
                      key={i}
                      image={skillGroup.campaigns.profile_image}
                      name={skillGroup.skills[i]}
                    />
                  );
                }
              })}
            </View>
            <View style={styles.itemFooterRow}></View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default SkillGroupContent;
