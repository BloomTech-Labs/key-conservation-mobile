import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../../../constants/SkilledImpact/SupporterSkilledImpactBody';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import SkillGroupElement from './SkillGroupElement';
import Skills from '../../../constants/Skills';
import { connect } from 'react-redux';

const assetPath = '../../../assets/images/SkilledImpact/Skills_Logos/';

const skillsImageMap = {
  ACCOUNTING: require(assetPath + 'Accounting.png'),
  ARCHITECTURE: require(assetPath + 'Architecture.png'),
  AUTO: require(assetPath + 'Auto.png'),
  APP_DEVELOPMENT: require(assetPath + 'App_Development.png'),
  ART: require(assetPath + 'Art.png'),
  AVIATION: require(assetPath + 'Aviation.png'),
  BOATING: require(assetPath + 'Boating.png'),
  BUSINESS_DEVELOPMENT: require(assetPath + 'Business_Development.png'),
  CAMERA_TRAPS: require(assetPath + 'Camera_Trap.png'),
  COMMUNICATION: require(assetPath + 'Communication.png'),
  COMMUNITY_LIAISON: require(assetPath + 'Community_Liaison.png'),
  CONSTRUCTION: require(assetPath + 'Construction.png'),
  CRAFT: require(assetPath + 'Craft.png'),
  CULINARY: require(assetPath + 'Culinary.png'),
  DATA_ANALYSIS: require(assetPath + 'Data_Analysis.png'),
  DATABASE_MANAGEMENT: require(assetPath + 'Database_Management.png'),
  DIVING: require(assetPath + 'Diving.png'),
  DRONE: require(assetPath + 'Drone.png'),
  ELECTRICITY: require(assetPath + 'Electricity.png'),
  ENGINEERING: require(assetPath + 'Engineering.png'),
  ENTREPRENEURSHIP: require(assetPath + 'Entrepreneurship.png'),
  FINANCE: require(assetPath + 'Finance.png'),
  FUNDRAISING: require(assetPath + 'Fundraising.png'),
  GAMING: require(assetPath + 'Gaming.png'),
  GRAPHIC_DESIGN: require(assetPath + 'Graphic_Design.png'),
  HOSPITALITY: require(assetPath + 'Hospitality.png'),
  HUMAN_RESOURCES: require(assetPath + 'Human_Resources.png'),
  INFORMATION_TECHNOLOGY: require(assetPath + 'Information_Technology.png'),
  LANDSCAPE: require(assetPath + 'Landscape.png'),
  LEGAL: require(assetPath + 'Legal.png'),
  MANAGEMENT: require(assetPath + 'Management.png'),
  MARKETING: require(assetPath + 'Marketing.png'),
  MEDICAL: require(assetPath + 'Medical.png'),
  MUSICAL: require(assetPath + 'Musical.png'),
  PHOTOGRAPHY: require(assetPath + 'Photography.png'),
  PLUMBING: require(assetPath + 'Plumbing.png'),
  PUBLIC_RELATIONS: require(assetPath + 'Public_Relations.png'),
  RENEWABLE_ENERGY: require(assetPath + 'Renewable_Energy.png'),
  RESEARCH: require(assetPath + 'Research.png'),
  SENSORS: require(assetPath + 'Sensors.png'),
  SOCIAL_MEDIA: require(assetPath + 'Social_Media.png'),
  STRATEGY_CONSULTING: require(assetPath + 'Strategy_Consulting.png'),
  TAXI: require(assetPath + 'Taxi.png'),
  TRANSLATION: require(assetPath + 'Translation.png'),
  VETERINARY_SERVICES: require(assetPath + 'Veterinary_Services.png'),
  VIDEOGRAPHY: require(assetPath + 'Videography.png'),
  WEB_DESIGN: require(assetPath + 'Web_Design.png'),
  WEB_DEVELOPMENT: require(assetPath + 'Web_Development.png'),
  WRITING: require(assetPath + 'Writing.png'),
};

class SkillGroupContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      skillGroups: props.skillGroups,
    };
  }

  componentDidUpdate = async (prevProps) => {
    if (
      prevProps.currentUserProfile.skills !==
      this.props.currentUserProfile.skills
    ) {
      this.setState({
        skillGroups: this.props.currentUserProfile.skills,
      });
      console.log('Skilled Groups Done');
    }
  };

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
              {this.state.skillGroups.length > 0 ? (
                this.state.skillGroups.map((skillGroup, i) => {
                  const skill = Skills[skillGroup];
                  const image = skillsImageMap[skillGroup];
                  return (
                    <SkillGroupElement key={i} image={image} name={skill} />
                  );
                })
              ) : (
                <View style={styles.skillGroupDescription}>
                  <Text>
                    Select your skills above to see available Skilled Groups
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.itemFooterRow}></View>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps, {})(SkillGroupContent);
