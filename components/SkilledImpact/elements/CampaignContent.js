import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../constants/SkilledImpact/CampaignContent';
import Lightening from '../../../assets/jsicons/bottomnavigation/Lightening';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import CampaignElement from './CampaignElement';

class CampaignContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillExpand: true,
      isReachable: true,
      skills: props.skills,
      campaigns: props.campaigns,
    };
  }

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
            {campaignList ? (
              campaignList.map((campaign, keyIndex) => {
                if (campaign) {
                  return <CampaignElement key={keyIndex} campaign={campaign} />;
                }
              })
            ) : (
              <View style={styles.description}>
                <Text>Select your skills above to see available campaigns</Text>
              </View>
            )}
          </View>
        ) : null}
      </View>
    );
  }
}

export default CampaignContent;
