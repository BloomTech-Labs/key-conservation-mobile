import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../../../constants/SkilledImpact/CampaignContent';
import Lightening from '../../../assets/jsicons/bottomnavigation/Lightening';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import CampaignElement from './CampaignElement';

import { getCampaignsBySkill } from '../../../store/actions';
import { connect } from 'react-redux';

class CampaignContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillExpand: true,
      isReachable: true,
      skills: props.skills,
      campaigns: props.campaigns,
      loading: false,
    };
  }

  componentDidUpdate = async (prevProps) => {
    if (
      prevProps.currentUserProfile.skills !==
      this.props.currentUserProfile.skills
    ) {
      this.setState({
        campaigns: [],
        loading: true,
      });
      const { skills } = this.props.currentUserProfile;
      if (skills) {
        for (const skill of skills) {
          await this.props.getCampaignsBySkill(skill);
          this.setState({
            campaigns: this.state.campaigns.concat(this.props.campaignsBySkill),
          });
        }
      }
      this.setState({
        loading: false,
      });
      console.log('Campaigns Done');
    }
  };

  skillExpand = () => {
    this.setState({ skillExpand: !this.state.skillExpand });
  };

  render() {
    const campaignList = this.state.campaigns;
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity
          style={styles.itemTitleRow}
          onPress={this.skillExpand}
        >
          <Lightening />
          <Text style={styles.itemTitleText}>Current Campaigns</Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.skillExpand ? <ChevronBottom /> : <ChevronRight />}
          </View>
        </TouchableOpacity>
        {this.state.skillExpand ? (
          <View style={styles.itemContentBody}>
            {!this.state.loading ? (
              campaignList.length !== 0 ? (
                campaignList.map((campaign, keyIndex) => {
                  if (campaign) {
                    return (
                      <CampaignElement key={keyIndex} campaign={campaign} />
                    );
                  }
                })
              ) : (
                <View style={styles.description}>
                  <Text>
                    Select your skills above to see available campaigns that
                    match your skills
                  </Text>
                </View>
              )
            ) : (
              <ActivityIndicator style={{ width: '100%', marginBottom: 10 }} />
            )}
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  campaignsBySkill: state.campaignsBySkill,
});
export default connect(mapStateToProps, {
  getCampaignsBySkill,
})(CampaignContent);
