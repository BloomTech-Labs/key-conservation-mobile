import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import ShieldWithCheckMark from '../../../assets/jsicons/miscIcons/ShieldWithCheckMark';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';

class OurSkillImpactGroup extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      skillExpand: true,
    };
  }

  skillExpand = () =>{
    this.setState({skillExpand: !this.state.skillExpand})
  };

  render() {
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={this.skillExpand}>
          <ShieldWithCheckMark/>
          <Text style={styles.itemTitleText}>
            Our Skilled Impact Groups
          </Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.skillExpand ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {this.state.skillExpand ? (
          <View style={styles.itemContentBody}>

          </View>
        ) : null}
      </View>

    );
  }
}

export default OurSkillImpactGroup;
