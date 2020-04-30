import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Lightening from '../../../assets/jsicons/bottomnavigation/Lightening';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import { Avatar } from 'react-native-elements';
import * as moment from 'moment';

class CampaignContent extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      skillExpand: true,
      isReachable: true,
      skills: props.skills,
      campaigns: props.campaigns
    };
  }

  skillExpand = () =>{
    this.setState({skillExpand: !this.state.skillExpand})
  };

  render() {
    const campaignList = this.state.campaigns;

    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={this.skillExpand}>
          <Lightening/>
          <Text style={styles.itemTitleText}>
            Current Campaigns
          </Text>
          <View style={styles.chevronArrowContainer}>
            {this.state.skillExpand ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {this.state.skillExpand ? (
          <View style={styles.itemContentBody}>
              {campaignList.map((campaign, keyIndex)=>{
                if(campaign){
                  return(
                    <View key={keyIndex} style={styles.itemContentRows}>
                    <View style={styles.avatarImageContainer}>
                      <Avatar
                        size={65}
                        rounded
                        source={{
                          uri: campaign.image || undefined
                        }}
                      />
                    </View>
                      <View style={styles.campaignRightContainer}>
                        <View style={styles.campaignRow}>
                        <Text style={styles.campaignOrganizationName}>
                          {campaign.name}
                        </Text>
                          <View style={styles.chevronArrowContainer}>
                          <ChevronRight />
                          </View>
                        </View>
                        <View style={styles.campaignRow}>
                          {campaign.is_deactivated ?
                            (<View style={styles.closeTag}>
                              <Text style={styles.closeText}>CLOSE</Text>
                            </View>):
                            (<View style={styles.openTag}>
                              <Text style={styles.mediumButtonText}>OPEN</Text>
                            </View>)}
                        </View>
                        <View style={styles.campaignRowFooter}>
                          <Text style={styles.intervalPostedText}>{moment.utc(campaign.created_at).local().startOf('seconds').fromNow()}</Text>
                        </View>
                      </View>
                    </View>
                  );
                }
              })}
          </View>
        ) : null}
      </View>

    );
  }
}

export default CampaignContent;
