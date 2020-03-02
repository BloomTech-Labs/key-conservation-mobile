import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../../constants/Profile/tabs/Details';
import ConnectFurther from '../ConnectFurther';
import ComingSoon from '../ComingSoon';

import Clipboard from '../../../assets/jsicons/detailAboutUs/Clipboard';
import Seedling from '../../../assets/jsicons/detailAboutUs/Seedling';

const Details = props => {
  const { profile } = props;

  return (
    <View style={styles.container}>
      <View style={styles.sections}>
        <ConnectFurther profile={profile} />
      </View>
      {profile.roles === 'supporter' && (
        <View>
          <View style={styles.sections}>
            <ComingSoon />
          </View>
        </View>
      )}

      {profile.roles !== 'supporter' && (
        <View>
          <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <Clipboard />
              <Text style={styles.title}>{'About Us'}</Text>
            </View>
            <Text style={styles.body}>{profile.about_us}</Text>
          </View>
          
// Species and Habitats is a feature not yet in place
          {/* <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <Seedling />
              <Text style={styles.title}>{'Species & Habitats'}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyText}>
                {profile.species_and_habitats}
              </Text>
            </View>
          </View> */}

        </View>
      )}
    </View>
  );
};

export default Details;
