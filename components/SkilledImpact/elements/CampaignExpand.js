import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Lightening from '../../../assets/jsicons/bottomnavigation/Lightening';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import CampaignContent from './CampaignContent';

export default React.forwardRef((props, ref) => {
  const [expanded, setExpand] = useState(true);

  const campaignList = props.campaigns;

  const toggleExpand = () =>{
    setExpand(!expanded);
  };

    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={toggleExpand}>
          <Lightening/>
          <Text style={styles.itemTitleText}>
            Current Campaigns
          </Text>
          <View style={styles.chevronArrowContainer}>
            {expanded ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {expanded ? (
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

});
