import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Lightening from '../../../assets/jsicons/bottomnavigation/Lightening';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import CampaignContent from './CampaignContent';

class CampaignExpand extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      expanded: true,
      campaigns: props.campaigns
    };
  }

  toggleExpand = () =>{
    this.setState({expanded: !this.state.expanded})
  };

  render() {
    const campaignList = this.state.campaigns;
    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={this.toggleExpand}>
          <Lightening/>
          <Text style={styles.itemTitleText}>
            Current Campaigns
          </Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.expanded ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View style={styles.itemContentBody}>
              {campaignList.map((campaign, keyIndex)=>{
                if(campaign){
                  return(
                    <CampaignContent
                      key={keyIndex}
                      campaign={campaign}
                    />
                  );
                }
              })}
          </View>
        ) : null}
      </View>

    );
  }
}

export default CampaignExpand;
