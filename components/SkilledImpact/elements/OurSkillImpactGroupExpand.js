import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import ShieldWithCheckMark from '../../../assets/jsicons/miscIcons/ShieldWithCheckMark';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';

class OurSkillImpactGroupExpand extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      expanded: true,
    };
  }

  toggleExpand = () =>{
    this.setState({expanded: !this.state.expanded})
  };

  render() {
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={this.toggleExpand}>
          <ShieldWithCheckMark/>
          <Text style={styles.itemTitleText}>
            Our Skilled Impact Groups
          </Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.expanded ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View style={styles.itemContentBody}>
            <View style={styles.itemFooterRow}>
              <Text style={styles.itemTitleText}>More Exciting Features To Come!</Text>
            </View>
          </View>
        ) : null}
      </View>

    );
  }
}

export default OurSkillImpactGroupExpand;
